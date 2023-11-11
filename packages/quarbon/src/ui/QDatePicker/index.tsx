
import { forwardRef, useEffect, useRef, useState } from 'react'
import { QCalendar } from '..'
import './QDatePicker.scss'
import { CbCalendar } from '@quarbon/icons/cb';

// To do: Ajustar outras funções do DatePicker,
// 1. Adicionar um range - Data de inicio e fim com e sem calendario. (Não tem essa necessidade)
//2. Fazer só o datepicker sem o calendario
// 3. Colocar o calendario para aparecer em outros lados, por exemplo, em cima do datepicker.

type DatePickerProps = {
    id: string;
    value?: string;
    onChange?: (date: string) => void;
    placeholder?: string;
    labelText?: string;
}

export const QDatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
    const { id, value, onChange, placeholder, labelText } = props;
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [isOpen, setIsOpen] = useState(false);
    // const datePickerRef = useRef<HTMLDivElement>(null);

    const toggleDatePicker = () => {
        setIsOpen(!isOpen)
    };
    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        onChange?.(date.toLocaleDateString());
        setIsOpen(false);

        if (onChange) {
            onChange(date.toLocaleDateString());
        }
    };

    // QDatePicker External click
    // const handleExternalClick = (event: MouseEvent) => {
    //     if (
    //         datePickerRef.current &&
    //         !datePickerRef.current.contains(event.target as Node)
    //     ) {
    //         setIsOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     document.body.addEventListener('click', handleExternalClick);
    //     return () => {
    //         document.body.removeEventListener('click', handleExternalClick);
    //     };
    // }, []);

    return (
        <div className="c-datepicker" ref={ref}>
            <div className="c-datepicker__input" onClick={toggleDatePicker}>
                <label htmlFor={id} className="c-datepicker__label">
                    {labelText}
                </label>
                <input
                    id={id}
                    type="text"
                    className="c-datepicker__input-input"
                    value={selectedDate ? selectedDate.toLocaleDateString() : value}
                    placeholder={placeholder}
                    readOnly
                    style={{ color: 'black' }}

                />
                <CbCalendar className='c-datepicker__input-input-icon' />
            </div>
            {isOpen && (
                <div className="c-datepicker__calendar" >
                    {<QCalendar onSelectDate={handleDateSelect} value={selectedDate} />}
                </div>
            )}
        </div>
    );

})