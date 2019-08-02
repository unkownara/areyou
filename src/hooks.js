import { useState } from 'react';

export function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    function onChangeHandler(e) {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: onChangeHandler
    }
}