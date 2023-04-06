export default function Card({id, name, status, species, gender, origin, image, onClose}) { //tambien se puede hacer con props
   //console.log(props)

   return (//si se hace con props en cada propiedad se tiene que escribir de la siguiente manera (props.name)
      <div>

         <button onClick={() => onClose(id)}>X</button>
         <h2>Name: {name}</h2>
         <h2>Status: {status}</h2>
         <h2>Species: {species}</h2>
         <h2>Gender: {gender}</h2>
         <h2>Origin: {origin}</h2>
         <img src={image} alt='' />

      </div>
   );
}
