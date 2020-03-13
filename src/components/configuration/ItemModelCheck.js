import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Form } from 'react-bootstrap';

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

    return (
        <Form>
            <Form.Check
                inline
                type="checkBox"
                id={model}
                label={model.name}
                onClick={() => setChecked(!checked)}
            />
        </Form>
    );
}

export default ItemModelCheck;
