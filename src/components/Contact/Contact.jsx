import React from "react";
//style
import "./Contact.scss";
//component
import Card from "../../components/Card/Card";
//image
import Github from '../../image/github.svg'
import LinkedIn from '../../image/linkedin.svg'
import Twitter from '../../image/twitter.svg'
import Hashnode from '../../image/hashnode.svg'
import Email from '../../image/gmail.svg'

//data
const connectData = [
  {icon:Github,txt:"Github",link:"https://github.com/anuragK-24"},
  {icon:LinkedIn,txt:"LinkedIn",link:"https://www.linkedin.com/in/anurag-kumar-4490ba1a6/"},
  {icon:Twitter,txt:"Twitter",link:"https://twitter.com/AnuragS41695054"},
  {icon:Hashnode,txt:"Hashnode",link:"https://anuragk24.hashnode.dev/"},
  {icon:Email,txt:"Email",link:"mailto:24sept.anurag@gmail.com"}
]

export default function Contact() {
  return (
    <div>
      <div className="Contact__Heading">Contact with me</div>
      <div className="Contact__Cards">
        <div className="Contact__Cards__Card">
          {connectData.map((a, key) => {
            return (
              <Card
                imageUrl={a.icon}
                label={a.txt}
                key={key}
                cardLink={a.link}
                cardClass={"Connect"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
