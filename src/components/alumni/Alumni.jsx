import React, { useEffect } from "react";
import Generatie from "./components/Generatie";
import "./alumni.scss";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import AOS from "aos";
import "aos/dist/aos.css";
import Persoana from "./components/AlumniPersoana";

function Alumni() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div style={{ background: "#2f2f2f" }}>
      <img
        src={require("../../img/alumni_banner.svg").default}
        alt=""
        className="header"
      />
      <Generatie
        years="2017-2018"
        team={false}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Băraru Alex"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Elisa Chicoș"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Radu Cătălina"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Boeru Alin"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Lupu Alexandru"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Drăguțu Rareș"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Costea Bogdan"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Munteanu Andrei"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Șerban Iulian"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Panaite Dănuț"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Spăsenie Viorica"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hahui Marian"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />
      <Generatie
        years="2018-2019"
        team={false}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Lupu Alexandru"
            text="Lorem ipsum dolor sit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Elisa Chicoș"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Radu Cătălina"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Ciolacu Cosmin"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Cristea Radu"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Anghel Adrian"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Băraru Alex"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Chiscop Robert"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Dimitriu Ilie"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Spăsenie Viorica"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Șerban Iulian"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Panaite Danuț"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Costea Bogdan"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />
      <Generatie
        years="2019-2020"
        team={false}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Danuț Panaite"
            text="Lorem ipsum dolor sit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, nulla dolorem quia velit cumque error. Ad, incidunt quia voluptatibus provident dicta sed reiciendis similique non dolores molestiae. Dolores, numquam iusto?"
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Anghel Adrian"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Bors Alexandru"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Baducu Alexandru"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popa Amira"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Costea Bogdan"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Constantin Patricia"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Postolache Elis"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Epure Radu"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Rarinca Mădălina"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popescu Robert"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Drăguțu Matei"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Rolea Alex"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Sevastre Beatrice"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />

      <Generatie
        years="2021-2022"
        team={false}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Bors Alexandru"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popa Amira"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Epure Radu"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popescu Robert"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Drăguțu Matei"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Sevastre Beatrice"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Borșan Claudiu"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Marcello Oprea"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Irimia Mihai"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Donici Roberto"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Mereuță Ionuț"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Mazilu Teodora"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Panaite Cristian"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam reiciendis, possimus esse sit tenetur, et debitis non earum ratione, natus dolorem neque expedita ipsum? Enim natus quasi molestias ea."
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />
      <Contact />
      <Up />
    </div>
  );
}

export default Alumni;
