import Alert, { AlertType } from "./components/Alert/alert";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";

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
      <Alert message="消息" type={AlertType.Success} />
      <Alert message="消息" type={AlertType.Info} />
      <Alert message="消息" type={AlertType.Info} closable />
      <Alert message="消息" type={AlertType.Info} closable description="描述" />
    </div>
  );
}

export default App;
