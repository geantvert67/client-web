import React, { useState, useEffect } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Form } from 'react-bootstrap';
import { ItemModelName } from '../OverlayTip';

function ItemModelCheck({ model, selectedModels, setSelectedModels }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        checked
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
    }, [checked]);

    const checkItemModel = () => {
        let checked = false;
        selectedModels.map(m => m.name === model.name && (checked = true));
        return checked;
    };

    return (
        <Form>
            <Form.Check
                inline
                type="checkBox"
                id={model.name}
                label={<ItemModelName model={model} />}
                checked={checkItemModel()}
                onClick={() => setChecked(!checked)}
            />
        </Form>
    );
}

export default ItemModelCheck;
