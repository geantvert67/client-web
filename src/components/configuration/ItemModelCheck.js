import React, { useState, useEffect } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { ItemModelName } from '../OverlayTip';

function ItemModelCheck({ model, selectedModels, setSelectedModels }) {
    const [isChecked, setChecked] = useState(model.checked);

    useEffect(() => {
        isChecked
            ? setSelectedModels(
                  selectedModels.concat({
                      name: model.name,
                      visibilityRadius: null,
                      actionRadius: null,
                      waitingPeriod: null,
                      autoMove: false
                  })
              )
            : setSelectedModels(
                  selectedModels.filter(m => m.name !== model.name)
              );
    }, [isChecked]);

    const handleClick = () => {
        setChecked(!isChecked);
    };

    return (
        <Col>
            <Form.Check
                inline
                type="checkBox"
                id={model.name}
                label={<ItemModelName model={model} />}
                checked={isChecked}
                onClick={() => handleClick()}
            />
        </Col>
    );
}

export default ItemModelCheck;
