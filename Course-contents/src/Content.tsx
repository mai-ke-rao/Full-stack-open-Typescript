interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase{
  description?: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription{
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground|CoursePartSpecial;

interface entries {
  entry: CoursePart[]
}

const Part = (element: CoursePart):JSX.Element => {

  console.log(element);
 


      switch(element.kind){
          case "basic":
            
              return(
                  <p>{element.name} {element.exerciseCount}
                  <br /> {element.description}
                  </p>
              );
            
          case "group":
            return(
              <p>{element.name} {element.exerciseCount}
              <br />Project count: {element.groupProjectCount}</p> 
          );
          case "background":
            return(
              <p>{element.name} {element.exerciseCount}
            <br />{element.backgroundMaterial}</p> 
            );
            case "special":
              return( 
                <p>{element.name} {element.exerciseCount}
                              <br /> {element.description}
                              <br /> required skills: {...element.requirements}         
                                </p>


              )
          default:
            return(<p> confusion of the huighes orda</p>);
        }    
 

  return(<p> confusion of the huighes orda</p>);
  }


const Contents = (prop: entries) => {


return(
  
    <div>
      { prop.entry.map(entry => 
        <Part {...entry}/>
      )
    }
  
    </div>
)

};

export default Contents;

