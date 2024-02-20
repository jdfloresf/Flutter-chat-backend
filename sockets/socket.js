const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    
    // Verificar auntenticación
    if(!valido) {return client.disconnect(); }
    
    // Cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en particular
    // sala global, client.id. 
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);
        
        io.to(payload.para).emit('mensaje-personal', payload);
    }) 

    
    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje!!!', payload)

    //     io.emit('mensaje', {admin: 'Nuevo mensaje'});
    // });
    
    
});
