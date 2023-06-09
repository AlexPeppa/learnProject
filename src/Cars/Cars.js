import { useState } from "react";
import styles from "./cars.module.css";

const Cars = () => {

  const cars = [
    {
      code: "BMW",
      name: "Bmw",
      description: {
        text:'По-русски название «BMW» произносится «бэ-эм-вэ́», что близко к немецкому произношению; изредка встречается написание «БМВ». Существует также несколько «неофициальных» названий: из англоязычного произношения аббревиатуры «би-эм-дабл-ю» для мотоциклов фирмы исторически сложилось название «бимер» (англ. beemer), для автомобилей — похожее, но не равнозначное «биммер» (англ. bimmer)[9]. В России для обозначения марки могут также применяться названия «бэха», «биммер», «бумер»[10], в Греции — «beba», в арабских странах — «BM»[11]. Автомобили также могут называться соответственно их серии, например для 5-й серии — «пятёрка» (нем. Fünfer).',
        state: 'German',
        models: ["Alpina","DriveNow","Mini","Rolls-Royce",],
        founded: 1916 
      },
    },
    {
      code:'PORSCHE',
      name:'Porsche',
      description: {
        text:'Компания выпускает спортивные автомобили класса «люкс», а также внедорожники. Производство Porsche в значительной мере кооперируется с Volkswagen. А параллельно с участием в автоспорте, ведётся работа над совершенствованием конструкции автомобиля (и его узлов): в разные годы были разработаны синхронизаторы механической КПП, автоматические КПП с возможностью ручного переключения (впоследствии — с кнопками переключения на руле), турбонаддув для серийного автомобиля, турбонаддув с изменяемой геометрией крыльчатки турбины в бензиновом двигателе, электронно-управляемая подвеска и так далее.',
        state: 'German',
        models: ["Carrera GT","Macan","Panamera","911 (classic)"],
        founded: 1931 
      }
    },
    {
      code:'LADA',
      name:'Lada',
      description: {
        text:'20 июля 1966 года вышло Постановление правительства СССР о строительстве в городе Тольятти завода по выпуску 600 тысяч легковых автомобилей в год. Эта дата считается днем рождения Волжского автомобильного завода.Создание предприятия-флагмана отечественного автомобилестроения тесно связано с итальянским концерном FIAT, с которым министерство автомобильной промышленности СССР подписало протокол о научно-техническом сотрудничестве.Появление Волжского автозавода было обусловлено тем, что в то время в СССР производилось менее 150 тысяч легковых машин в год. В связи с этим ощущалась острая необходимость в комфортабельных и доступных автомобилях.',
        state: 'Russia',
        models: ["Granta","Largus","Vesta","Niva Travel"],
        founded: 1966  
      }
    }
  ];

 const[state,setState] = useState()

const list = cars.map(i=><ul><li>{i.name}</li></ul>)

  return <div className={styles.wrapper}>
{list}
  </div>;
};
export default Cars;
