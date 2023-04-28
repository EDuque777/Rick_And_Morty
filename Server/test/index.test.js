const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 7777,
    name: "Esteban",
    species: "Human",
    gender: "Male",
    status: "Alive",
    origin: {
        name: "Earth (C-137)"
    },
    image: "image.jpg"
}

describe("Test de RUTAS", () => {

    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async() => {
            
            //PRIMERA FORMA
            //await request.get('/rickandmorty/character/1').expect(200);
        
            //SEGUNDA FORMA
            const response = await request.get("/rickandmorty/character/1");
            expect(response.statusCode).toBe(200)
        })

        it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image'", async () => {
            const response = await request.get("/rickandmorty/character/1");
            //console.log(response.body)

            //PRIMERA FORMA
            // expect(response.body).toHaveProperty('id')
            // expect(response.body).toHaveProperty('name')
            // expect(response.body).toHaveProperty('species')
            // expect(response.body).toHaveProperty('gender')
            // expect(response.body).toHaveProperty('status')
            // expect(response.body).toHaveProperty('origin')
            // expect(response.body).toHaveProperty('image')
        
            //SEGUNDA FORMA
            // const obj = {
            //     id: 7777,
            //     name: "Esteban",
            //     species: "Human",
            //     origin: {
            //         name: "Earth (C-137)"
            //     },
            //     image: "image.jpg",
            //     gender: "Male",
            //     status: "Alive"
            // }
            // for(const prop in obj){
            //     expect(response.body).toHaveProperty(prop)
            // }

            //TERCER FORMA
            //  const props = ['id', 'name', 'species', 'gender', 'status', 'origin', 'image']
            //  props.forEach(prop => {
            //     expect(response.body).toHaveProperty(prop)
            //  })

            //CUARTA FORMA
            for(const prop in character){
                expect(response.body).toHaveProperty(prop)
            }
        })

        it("Si hay un error responde con status: 500", async () => {
            const response = await request.get("/rickandmorty/character/7777E");
            expect(response.statusCode).toBe(500)
        })
    })


    describe("GET /rickandmorty/login", () => {
        const access = {access: true};

        it("Responde con un objeto con la propiedad access en true si la informacion del usuario es valida", async () => {
            const response = await request.get("/rickandmorty/login?email=Esteban.duque911@gmail.com&password=Esteban7");
            expect(response.body).toEqual(access)
        })

        it("Responde con un objeto con la propiedad access en false si la informacion del usuario no es valida", async () => {
            const response = await request.get("/rickandmorty/login?email=Esteban.duq@gmail.com&password=Esteban777777");
            access.access = false;
            expect(response.body).toEqual(access)
        })
    })


    describe("POST /rickandmorty/fav", () => {
        it("Debe guardar el personaje en favorito", async () => {
            
            const response = await request.post("/rickandmorty/fav").send(character);
            //console.log(response.body)
            expect(response.body).toContainEqual(character)
        })

        it("Debe agregar el personaje a favorito sin eliminar a los existentes", async () => {
            character.id = 1923;
            character.name = "FT 37a";
            const response = await request.post("/rickandmorty/fav").send(character)
            //console.log(response.body)
            expect(response.body.length).toBe(2)
        })
    })


    describe("DELETE /rickandmorty/fav/:id", () => {
        it("Si el ID solicitado no existe, deberia retornar un arreglo un arrego con todos los favoritos", async () => {
            const response = await request.delete("/rickandmorty/fav/2lk");
            //console.log(response.body)
            expect(response.body.length).toBe(2)
        })

        it("Si el ID enviado existe, deberia eliminarlo de favoritos", async () => {
            const response = await request.delete("/rickandmorty/fav/1923");
            expect(response.body.length).toBe(1)
        })
    })
})