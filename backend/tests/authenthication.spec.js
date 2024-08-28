import request from 'supertest'
import app from "../src/app.js"


describe("POST /login", () => {
   
    describe('Pruebas al login', () => { 

    const body = {
        nombre_usuario: "admin",
        contrasena: "123"
    }    

    const credencialesErroneas = [
        {nombre_usuario: "adminzzzzzzzzzzzzzzz", contrasena: "123"},
        {nombre_usuario: "admin", contrasena: "12zzz3"}
    ]
   
    test('prueba unitaria endpoint login, se espera un status 200 en la respuesta por credenciales correctas', async () => { 
        const response = await request(app).post("/api/login").send(body)
        expect(response.statusCode).toBe(200) 
     })

     test('prueba unitaria endpoint login, se espera un status 404 en la respuesta por credenciales incorrectas', async () => {
        for(const bodyErroneo of credencialesErroneas){
            const response = await request(app).post("/api/login").send(bodyErroneo);
            expect(response.statusCode).toBe(404);
        }
    });
     
    })
})