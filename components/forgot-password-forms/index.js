import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";

const Forms = ({ formNumber, onNextHandler, setIsBackdropOpen }) => {
	switch (formNumber) {
		case 1:
			return <Form1 {...{ onNextHandler }} />;

		case 2:
			return <Form2 {...{ onNextHandler }} />;

		case 3:
			return <Form3 {...{ onNextHandler, setIsBackdropOpen }} />;

		default:
			return <></>;
	}
};

export default Forms;
