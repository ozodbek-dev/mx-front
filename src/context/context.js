import { createContext, useState } from "react";

export const Contextvalue = createContext();

export const Context = ({ children }) => {
  const [paramsid, setParamsid] = useState(null);
  const [input, setInput] = useState();
  const [parval, setParval] = useState();
  const [nametxt, setNametxt] = useState();
  const [ulchovtxt, setUlchovtxt] = useState();
  const [turitxt, setTuritxt] = useState();
  const [miqtxt, setMiqtxt] = useState();
  const [id, setId] = useState();
  const [snsid, setSnsid] = useState();
  const [mahsulotlar, setMahsulotlar] = useState();
  const [open, setOpen] = useState(false);
  const [navi, setNavi] = useState(false);
  const [vss, setVss] = useState();
  const [men, setMen] = useState();
  const [tur, setTur] = useState();
  const [nom, setNom] = useState();
  const [bir, setBir] = useState("");
  const [miq, setMiq] = useState("");
  const [narx, setNarx] = useState("");
  const [name, setName] = useState("");
  const [filetool, setFiletool] = useState([]);
  const [cur, setCur] = useState();
  const [cur2, setCur2] = useState();
  const [cur3, setCur3] = useState();
  const [cur4, setCur4] = useState();
  const [cur5, setCur5] = useState();
  const [cur6, setCur6] = useState();
  const [value, setValue] = useState(0);
  const [values, setValues] = useState(0);
  const [enter, setEnter] = useState(null);
  const [exit, setExit] = useState(null);
  const [countapplications, setCountapplications] = useState(false);
  const [countes, setCountes] = useState(false);
  return (
    <Contextvalue.Provider
      value={{
        setCountes,
        countes,
        countapplications,
        setCountapplications,
        values,
        setExit,
        exit,
        enter,
        setEnter,
        setValues,
        value,
        setValue,
        cur6,
        setCur6,
        setCur5,
        cur5,
        setCur4,
        cur4,
        cur3,
        setCur3,
        cur2,
        setCur2,
        cur,
        setCur,
        filetool,
        setFiletool,
        tur,
        setTur,
        nom,
        setNom,
        bir,
        setBir,
        miq,
        setMiq,
        narx,
        setNarx,
        name,
        setName,
        paramsid,
        setParamsid,
        input,
        setInput,
        parval,
        setParval,
        navi,
        setNavi,
        nametxt,
        setNametxt,
        ulchovtxt,
        setUlchovtxt,
        turitxt,
        setTuritxt,
        miqtxt,
        setMiqtxt,
        open,
        setOpen,
        id,
        setId,
        snsid,
        setSnsid,
        mahsulotlar,
        setMahsulotlar,
        setVss,
        vss,
        men,
        setMen,
      }}
    >
      {children}
    </Contextvalue.Provider>
  );
};
