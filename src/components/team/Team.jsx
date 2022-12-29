import React, { useEffect } from "react";
import Generatie from "../alumni/components/Generatie";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import AOS from "aos";
import "aos/dist/aos.css";
import Persoana from "../alumni/components/AlumniPersoana";

function Team() {
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
        team={true}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Băraru Alex"
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Elisa Chicoș"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Radu Cătălina"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Boeru Alin"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Lupu Alexandru"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Drăguțu Rareș"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Costea Bogdan"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Munteanu Andrei"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Șerban Iulian"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Panaite Dănuț"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Spăsenie Viorica"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hahui Marian"
            
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />
      <Generatie
        years="2018-2019"
        team={true}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Lupu Alexandru"
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Elisa Chicoș"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Radu Cătălina"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Ciolacu Cosmin"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Cristea Radu"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Anghel Adrian"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Băraru Alex"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Chiscop Robert"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Dimitriu Ilie"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Spăsenie Viorica"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Șerban Iulian"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Panaite Danuț"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Costea Bogdan"
            
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />
      <Generatie
        years="2019-2020"
        team={true}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Danuț Panaite"
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Anghel Adrian"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Bors Alexandru"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Baducu Alexandru"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popa Amira"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Costea Bogdan"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Hanga Mihail"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Constantin Patricia"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Postolache Elis"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Epure Radu"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Rarinca Mădălina"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popescu Robert"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Drăguțu Matei"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Rolea Alex"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Sevastre Beatrice"
            
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />

      <Generatie
        years="2021-2022"
        team={true}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Bors Alexandru"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popa Amira"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Epure Radu"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popescu Robert"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Drăguțu Matei"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Sevastre Beatrice"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Borșan Claudiu"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Marcello Oprea"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Irimia Mihai"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Donici Roberto"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Mereuță Ionuț"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Mazilu Teodora"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Panaite Cristian"
            
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />

      <Generatie
        years="2022-2023"
        team={true}
        persoane={[
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Bors Alexandru"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popa Amira"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Epure Radu"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Popescu Robert"
            
            faculta="Politehnica - FIIR -"
          />,

          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Drăguțu Matei"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Sevastre Beatrice"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Borșan Claudiu"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Marcello Oprea"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Irimia Mihai"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Donici Roberto"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Mereuță Ionuț"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Mazilu Teodora"
            
            faculta="Politehnica - FIIR -"
          />,
          <Persoana
            img="https://scontent.fsbz1-2.fna.fbcdn.net/v/t1.6435-9/86695369_2663907933657090_2295697635035578368_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=Cuu-kgupuvcAX-LrotL&_nc_ht=scontent.fsbz1-2.fna&oh=00_AfAzrMERSCdvnLlEuOfSHFR5IT2TbHWe_OY3U-vkhD-haQ&oe=63D19073"
            nume="Panaite Cristian"
            
            faculta="Politehnica - FIIR -"
          />,
        ]}
      />
      <Contact />
      <Up />
    </div>
  );
}

export default Team;
