import Button, { ButtonType, ButtonSize, ButtonShape } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <Button>Defalut</Button>
      <Button disabled>Disabled</Button>
      <Button btnType={ButtonType.Primary}>Primary</Button>
      <Button btnType={ButtonType.Link} href="https://www.google.com">Link</Button>
      <Button btnType={ButtonType.Link} >Link</Button>
      <Button btnType={ButtonType.Link} href="https://www.google.com" disabled>Link Disabled</Button> 
      <Button btnType={ButtonType.Dashed}>Dashed</Button>
      <Button danger>Danger</Button>
      {/* <Button type={ButtonType.Text}>Text</Button> */}
      <Button size={ButtonSize.Large}>Large</Button>
      <Button size={ButtonSize.Medium}>Medium</Button>
      <Button size={ButtonSize.Small}>Small</Button>
      <Button loading>Loading</Button>
      <Button btnType={ButtonType.Primary} loading>Loading</Button>
      <Button btnType={ButtonType.Primary} danger>danger</Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary} loading>Loading</Button>
      {/* <Button shape={ButtonShape.Circle}>Circle</Button>
      <Button shape={ButtonShape.Round}>Round</Button> */}
    </div>
  );
}

export default App;
