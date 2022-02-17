import { Testimonial } from '../models/Testimoniales.js'

const guardarTestimonial = async (req, res) => {
//validar

const { nombre, email, mensaje } = req.body
const errores = []

if (nombre.trim() === '') {
  errores.push({mensaje : 'Falta nombre'})
}

if (email.trim() === '') {
    errores.push({mensaje : 'Falta correo'})
}

if (mensaje.trim() === '') {
    errores.push({mensaje : 'Falta mensaje'})
}

if (errores.length > 0) {

    //Consultar testimoniales
    const testimoniales = await Testimonial.findAll()

    res.render('testimoniales', {
        pagina:'Testimoniales',
        errores,
        nombre,
        email,
        mensaje,
        testimoniales
    })
} else {
    //Almacenar en la base de datos

    try {
        await Testimonial.create({
            nombre,
            email,
            mensaje
        })

        res.redirect('/testimoniales')
    } catch (error) {
        console.log(error)
    }
}

}

export {
    guardarTestimonial,
}