import React, { useState } from 'react';
import { addRandomFlags } from '../../utils/utils';

function ItemsButtons({
    items,
    setItems,
    modelItems,
    selectedModelItem,
    setSelectedModelItem
}) {
    return (
        <>
            <div className="center">
                {modelItems.map(item => (
                    <button
                        className={
                            selectedModelItem === modelItems.indexOf(item)
                                ? 'selected'
                                : undefined
                        }
                        onClick={e =>
                            setSelectedModelItem(modelItems.indexOf(item))
                        }
                    >
                        {' '}
                        Ajouter un item "{item.name}"
                    </button>
                ))}
            </div>
        </>
    );
}

export default ItemsButtons;
