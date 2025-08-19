import styles from './InputField.module.css';

const InputField = ({ type = "text", name = "", id = "", label = "Input", ...props }) => {
    return (
        <div className="overflow-hidden">
            <div className="relative mt-4">
                <input
                    type="text"
                    id={id} name={name}
                    aria-label={label}
                    {...props}
                    className="pb-0.5 pt-5 w-full border-b-[1px] bg-transparent appearance-none focus:outline-none peer"
                    placeholder=" " />
                <label
                    htmlFor={id}
                    className="absolute bg-white text-[1.1rem] text-[var(--mainColor)] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                    {label}
                </label>
                
                <div className={styles["input-wrapper"]}></div>
            </div>
        </div>
    );
};

export default InputField;


{/* <InputField type="email" label="EMAIL" /> */ }
