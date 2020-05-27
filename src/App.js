import React, { useState, useEffect, useContext } from "react";
import "./App.css";

function DeclareStateVar() {
  const [count] = useState(100);

  return (
    <div>
      <p>State variable count is {count}</p>
    </div>
  );
}

function UpdateStateVariable() {
  const [age, setage] = useState(29);

  const handleAge = () => {
    setage(age + 1);
  };

  return (
    <div>
      <p>I am {age} years old</p>
      <button onClick={handleAge}>Inrease Age</button>
    </div>
  );
}

function MultipleStateVariables() {
  const [age, setage] = useState(29);
  const [sibling, setsibling] = useState(1);

  const handleAge = () => {
    setage(age + 1);
  };

  const handleSibling = () => {
    setsibling(sibling + 1);
  };

  return (
    <div>
      <p>I am {age} years old</p>
      <p>I have {sibling} siblings</p>
      <button onClick={handleAge}>Increase Age</button>
      <button onClick={handleSibling}>Increase Sibling</button>
    </div>
  );
}

function StateObject() {
  const [state, setstate] = useState({ age: 29, sibling: 1 });

  const handleClick = (val) => {
    setstate({
      ...state,
      [val]: state[val] + 1,
    });
  };

  const { age, sibling } = state;

  return (
    <div>
      <p>I am {age} years old</p>
      <p>I have {sibling} siblings</p>
      <button onClick={handleClick.bind(null, "age")}>Increase Age</button>
      <button onClick={handleClick.bind(null, "sibling")}>
        Increase Sibling
      </button>
    </div>
  );
}

function StateFromFunction() {
  const [token] = useState(() => {
    let token = window.localStorage.getItem("my-token");
    return token || "default#-token#";
  });

  return (
    <div>
      <p>Token is {token}</p>
    </div>
  );
}

function CounterFunctionSetState() {
  const [count, setCount] = useState(0);
  const resetHandler = () => {
    setCount(count - count);
  };

  const additionHandler = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const subtractionHandler = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={resetHandler}>Reset</button>
      <button onClick={additionHandler}>Add (+)</button>
      <button onClick={subtractionHandler}>Subtract (-)</button>
    </div>
  );
}

function BasicEffect() {
  const [age, setAge] = useState(29);
  const ageHandler = () => {
    setAge(age + 1);
  };

  useEffect(() => {
    document.title = `I am ${age} years old`;
  }, [age]);

  return (
    <div>
      <button onClick={ageHandler}>Click to change title</button>
    </div>
  );
}

function EffectCleanup() {
  useEffect(() => {
    const clicked = () => console.log("window clicked");
    window.addEventListener("click", clicked);
    return () => {
      window.removeEventListener("click", clicked);
    };
  });

  return (
    <div>
      <p>
        When you click, you can see logger in console. Subsequent clicks will
        not create additional loggers
      </p>
    </div>
  );
}

function MultipleEffects() {
  useEffect(() => {
    const clicked = () => console.log("first effect");
    window.addEventListener("click", clicked);
    return () => {
      window.removeEventListener("click", clicked);
    };
  });

  useEffect(() => {
    console.log("second effect");
  });

  return (
    <div>
      <p>Check console logs</p>
    </div>
  );
}

const ThemeContext = React.createContext("light");

function ButtonHooks() {
  const theme = useContext(ThemeContext);
  return (
    <div
      style={{
        background: theme === "dark" ? "black" : "papayawhip",
        color: theme === "dark" ? "white" : "palevioletred",
        width: "100%",
        minHeight: "200px",
      }}
    >
      <button className={theme}>Some kind of button</button>
    </div>
  );
}

//const ThemeContext = React.createContext("light");

function Display() {
  const theme = useContext(ThemeContext);

  ThemeContext._currentValue = "dark";
  return (
    <div
      style={{
        background: theme === "dark" ? "black" : "papayawhip",
        color: theme === "dark" ? "white" : "palevioletred",
        width: "100%",
        minHeight: "200px",
      }}
    >
      {"The theme here is " + theme}
    </div>
  );
}

const LanguageContext = React.createContext({
  language: "en",
  setLanguage: () => {},
});

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <button onClick={() => setLanguage("jp")}>
      Switch Language (Current: {language})
    </button>
  );
};

const App = () => {
  const [language, setLanguage] = useState("en");
  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      <h2>Current Language: {language}</h2>
      <p>Click button to change to jp</p>
      <div>
        {/* Can be nested */}
        <LanguageSwitcher />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
