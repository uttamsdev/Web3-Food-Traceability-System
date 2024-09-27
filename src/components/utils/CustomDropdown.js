import { Select } from 'antd';
import { Urbanist } from 'next/font/google';
import { useEffect, useState } from 'react';
const urbanist = Urbanist({ subsets: ["latin"] });

const Dropdown = ({ searchBy, fieldName, error = false, label = "", options = [], placeholder = "Search or select", dropdownValues, setDropdownValues, selectFirst = false }) => {
    const [localValue, setLocalValue] = useState(null);

    // Map options to be used by Select
    const showedOptions = options.map(option => ({
        value: option[searchBy],
        label: option[searchBy],
        fullOption: option, // Store the full option object
    }));

    // Handle change event
    const handleChange = (value) => {
        const selectedOption = showedOptions.find(opt => opt?.value === value)?.fullOption;
        if (selectedOption) {
            setDropdownValues(prevValues => ({
                ...prevValues,
                [fieldName]: selectedOption,
            }));
        }
    };

    // Set default value if `selectFirst` is true and no value is set
    useEffect(() => {
        if (selectFirst && options.length > 0 && !dropdownValues[fieldName]) {
            const defaultOption = options[0];
            setDropdownValues(prevValues => ({
                ...prevValues,
                [fieldName]: defaultOption,
            }));
            setLocalValue(defaultOption[searchBy]);
        } else if (dropdownValues[fieldName]) {
            setLocalValue(dropdownValues[fieldName][searchBy]);
        }
    }, [options, fieldName, dropdownValues, setDropdownValues, selectFirst, searchBy]);

    // Determine the current value to be displayed
    const currentValue = dropdownValues?.[fieldName]?.[searchBy] || localValue || null;

    return (
        <div className={`select-tag w-full md:min-w-[100px] !${urbanist.className}`}>
            {/* {label && <Label text={label} />} */}
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder={placeholder}
                optionFilterProp={searchBy}
                filterOption={(input, option) =>
                    option.label && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                options={showedOptions}
                onChange={handleChange}
                className="select-custom"
                status={error ? "error" : ''}
                value={currentValue}
            />
            {/* {error && <ErrorText errText={"Please select an option"} />} */}
        </div>
    );
};

export default Dropdown;
