import { ChozaLayout } from '../components/ChozaLayout';
import { BannerImage } from '../components';

export default function Home() {

  return (
    <ChozaLayout
      title={'Inicio - Choza norteña'}
      pageDescription={'Didisfruta de las comidas criollas son el sabor auténtico de la tradición, un festín que une generaciones en cada bocado'}
      imageFullUrl={'choza1.jpg'}
    >
      <section className='panel-home animate__animated animate__fadeIn'>
        <div className='banner'>
          <BannerImage />
        </div>
        <div className='banner-layer'></div>
      </section>
    </ChozaLayout>
  );
}
