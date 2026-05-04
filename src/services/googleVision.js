// api key here
export const detectObjectGoogle = async base64 => {
  try {
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {
                  type: 'OBJECT_LOCALIZATION',
                  maxResults: 10,
                },
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 10,
                },
                {
                  type: 'WEB_DETECTION',
                  maxResults: 5,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    console.log('VISION RESPONSE:', JSON.stringify(data, null, 2));

    const res = data?.responses?.[0];

    if (!res) return null;

    let candidates = [];

    // 1️⃣ OBJECT LOCALIZATION (BEST)
    if (res.localizedObjectAnnotations?.length) {
      candidates.push(
        ...res.localizedObjectAnnotations.map(obj => ({
          name: obj.name,
          score: obj.score || 0,
          source: 'object',
        })),
      );
    }

    // 2️⃣ LABEL DETECTION (fallback)
    if (res.labelAnnotations?.length) {
      candidates.push(
        ...res.labelAnnotations.map(label => ({
          name: label.description,
          score: label.score || 0,
          source: 'label',
        })),
      );
    }

    // 3️⃣ WEB DETECTION (strong contextual accuracy)
    if (res.webDetection?.webEntities?.length) {
      candidates.push(
        ...res.webDetection.webEntities.map(web => ({
          name: web.description,
          score: web.score || 0,
          source: 'web',
        })),
      );
    }

    if (!candidates.length) return null;

    // 🔥 Clean invalid / weak results
    const filtered = candidates.filter(
      item => item.name && item.name.length > 1 && item.score >= 0.5,
    );

    if (!filtered.length) {
      // fallback: lowest threshold
      filtered.push(...candidates.filter(item => item.name));
    }

    // 🔥 Sort by confidence + priority boost
    const sorted = filtered.sort((a, b) => {
      const priority = {
        object: 3,
        web: 2,
        label: 1,
      };

      return priority[b.source] - priority[a.source] || b.score - a.score;
    });

    return sorted[0]?.name || null;
  } catch (error) {
    console.log('VISION ERROR:', error);
    return null;
  }
};
