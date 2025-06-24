const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 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`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "넌 캡시 AI 상담사야. 친근하고 간결하게, 캡시 외 질문은 정중하게 거절해." },
        { role: "user", content: message }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.choices[0].message.content })
  };
};
