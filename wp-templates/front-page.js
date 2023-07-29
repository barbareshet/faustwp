import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
  FeaturedImage
} from '../components';
import Image from "next/image";
import AlbumCard from "@/components/SiteComponents/AlbumCard";
import Link from "next/link";
import React from "react";

export default function Component(props) {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage, frontpageField } = props?.data?.page ?? { title: '' };
  const { page } = props?.data ?? { page: '' };
  console.log(page.frontpageFields.featuredAlbums)
  return (
    <>
      <SEO title={page.title ? page.title : siteTitle} description={siteDescription} />
      <Header
        title={page.title ? page.title : siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={page.title} />
          <div className="featured-image-wrap">
              <Image src={featuredImage?.node?.sourceUrl} width={featuredImage?.node?.mediaDetails?.width} height={featuredImage?.node?.mediaDetails?.height}/>
          </div>
          <div className="text-center">
            <div dangerouslySetInnerHTML={{__html:page.content}}/>
            <code>wp-templates/front-page.js</code>
          </div>
          <div className="featured-albums">
            <h2 className="title">
              {page.frontpageFields.albumsSectionTitle}
            </h2>
            <ul className="gallary">
              {
                  page.frontpageFields.featuredAlbums &&
                  page.frontpageFields.featuredAlbums
                      .map((album) => (
                          <li key={album.databaseId} className="galleryItem">
                            <Link href={`/albums/${album.slug}`} className="album-card">
                              <Image src={album?.albumFields?.cover?.mediaItemUrl} width={300} height={300} alt={album?.albumFields?.albumTitle}/>
                            </Link>
                          </li>
                      ))
              }
            </ul>
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: 2, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
       frontpageFields {
        albumsSectionTitle
        featuredAlbums {
          ... on Album {
            id
            databaseId
            slug
            albumFields {
              albumTitle
              cover {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }, first: 50) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
