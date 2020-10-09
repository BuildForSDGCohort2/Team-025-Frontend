import React, { useEffect } from 'react';
import { FaqSection } from "../../components";

const Faq = () => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <div style={{ marginTop: "72px", minHeight: "600px" }}>
      <FaqSection />
    </div>
  );
};

export default Faq;
