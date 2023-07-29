import Head from "next/head";
import {
    Header,
    Footer,
    Main,
    Container,
    NavigationMenu,
    Hero,
    SEO,
} from '../components';
function Layout({children, heroTitle}) {
    return (
        <>
            <Head>
                <title>Metallica Discography</title>
            </Head>
            <Hero title={heroTitle} />
            <Main>
                <Container>
                    {children}
                </Container>
            </Main>
            <Footer/>
        </>
    );
}

export default Layout;