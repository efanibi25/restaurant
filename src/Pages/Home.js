
import { Fragment } from "react";
import { CustomerEditFormContainer } from "../Component/EditForms/CustomerEditFormContainer"

function Home() {
    const triggerText = 'Open form';
    const onSubmit = (event) => {
      event.preventDefault(event);
      console.log(event.target.name.value);
      console.log(event.target.email.value);
    };
    return (
        <Fragment>
            
            <h1>This is a home Page</h1>
            <h1>Checkout Those Links</h1>
            <CustomerEditFormContainer triggerText={triggerText} onSubmit={onSubmit} />
        </Fragment>
    )
}

export default Home;
