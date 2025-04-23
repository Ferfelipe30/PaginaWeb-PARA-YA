const admin = require('./firebaseAdmin');
 
exports.handler = async (event, context) => {
  try {
    const userId = event.queryStringParameters.id;
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
 
    if (!userDoc.exists) {
      return {
        statusCode: 404,
        headers: { 'Access-Control-Allow-Origin': '*',},
        body: JSON.stringify({ error: 'Usuario no encontrado' }),
      };
    }
 
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*',},
      body: JSON.stringify(userDoc.data()),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*',},
      body: JSON.stringify({ error: 'Error al obtener el usuario' }),
    };
  }
};