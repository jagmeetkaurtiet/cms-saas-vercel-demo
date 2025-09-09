// JsonScript.tsx
import Script from "next/script";

interface JsonLdProps {
  data: Record<string, any>;
  id?: string;
}

const JsonLd: React.FC<JsonLdProps> = ({ data, id = "json-ld" }) => {
  return (
    <Script
      type="application/ld+json"
      id={id}
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data.script, null, 2) }}
    />
  );
};

export default JsonLd;
