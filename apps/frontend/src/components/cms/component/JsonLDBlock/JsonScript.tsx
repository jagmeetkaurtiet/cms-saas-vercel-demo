// components/JsonLd.tsx
import Script from "next/script";

interface JsonLdProps {
  data: Record<string, any>;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <Script
      type="application/ld+json"
      id="json-ld"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
};

export default JsonLd;
