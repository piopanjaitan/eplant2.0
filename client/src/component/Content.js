import React from "react";
import { Segment } from "semantic-ui-react";

const Content = ({ children }) => {
    return (
        <Segment basic >
            {children}
        </Segment>
    )
}

export default Content