const projectId = 'your-project-id';
const sessionId = 'your-session-id';
const languageCode = 'en-US';

const sendMessageToDialogflow = async message => {
  const endpoint = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

  const request = {
    session: `projects/${projectId}/agent/sessions/${sessionId}`,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(request),
  });

  const data = await response.json();
  const result = data.queryResult;

  return result;
};