import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import BasicInfo from "./(0)BasicInfo";
import WeightInfo from "./(1)WeightInfo";
import Exercise from "./(3)Exercise";
import TargetMacros from "./(4)TargetMacros";
import SignUp from "./SignUp";

function StepperPage() {
	const [activeStep, setActiveStep] = useState(0);

	// const handleNext = () => {
	// 	setActiveStep((prevActiveStep) => prevActiveStep + 1);

	// };

	// const handleBack = () => {
	// 	setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };

	const steps = [
		"Basic Info",
		"Weight",
		"Weight Goal",
		"Exercise",
		"Target Macros",
	];

	return (
		<div id="stepper">
			<Box
				sx={{
					width: "100%",
					mb: 3,
					display: "flex",
					flexDirection: "column",
					gap: 3,
					overflow: "auto hidden",
					"&::-webkit-scrollbar": { height: 10, WebkitAppearance: "none" },
					"&::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						border: "2px solid",
						borderColor: "#E7EBF0",
						backgroundColor: "rgba(0 0 0 / 0.5)",
					},
				}}
			>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};

						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps} />
							</Step>
						);
					})}
				</Stepper>
				{/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
					<Button
						color="inherit"
						disabled={activeStep === 0}
						onClick={handleBack}
						sx={{ mr: 1 }}
					>
						Back
					</Button>
					<Box sx={{ flex: "1 1 auto" }} />
					<Button onClick={handleNext}>
						{activeStep === steps.length - 1 ? "Finish" : "Next"}
					</Button>
				</Box> */}
			</Box>
			<SignUp />
			{/* <div>
				{activeStep === 0 && <BasicInfo />}
				{activeStep === 1 && <WeightInfo activeStep={activeStep} />}
				{activeStep === 2 && <WeightInfo activeStep={activeStep} />}
				{activeStep === 3 && <Exercise />}
				{activeStep === 4 && <TargetMacros />}
			</div> */}
		</div>
	);
}

export default StepperPage;
