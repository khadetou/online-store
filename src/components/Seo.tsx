import Head from "next/head";
import { FC } from "react";

interface SeoProps {
  description?: string;
  author?: string;
  meta?: any[];
  title?: string;
  lang?: string;
}

const SEO: FC<SeoProps> = ({
  description = "Marché Sénégale, achetez vos denréé Alimentaire à bas prix",
  author = "Khadetou Dianifabe",
  meta,
  title = "Marché Sénégal, Achetez vite vos denrées alimentaires",
}) => {
  const metaData = [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:creator",
      content: author,
    },

    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
  ].concat(meta!);

  return (
    <Head>
      <title>{title}</title>
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  );
};

SEO.defaultProps = {
  lang: "fr",
  meta: [],
};

export default SEO;
