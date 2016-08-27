import React from 'react';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import DatePicker from 'material-ui/DatePicker';

const prevStyles = {
	backgroundColor:"#009900",
	float:"left",
	width:"50%",
	border:"none",
	outline:"none",
	height:"34px"
};

const saveStyles = {
	backgroundColor:"#b8bdc1",
	float:"right",
	width:"50%",
	border:"none",
	outline:"none",
	height:"34px"
};

const OptionForm = ({graphOption,allAllowedSources,allAlowedFilters,allAlowedGranularities,onSave,onChange,saving,errors}) => {
	return(
		<form>
			<h1>Manage graph</h1>
			<TextInput name="title" label="Title" value={graphOption.title} onChange={onChange} error={errors.title}/>
			<TextInput name="description" label="Description" value={graphOption.description} onChange={onChange} error={errors.description}/>
			<TextInput name="width" label="Width" value={graphOption.width} onChange={onChange} error={errors.width}/>
			<TextInput name="height" label="Height" value={graphOption.height} onChange={onChange} error={errors.height} />
			<SelectInput name="datasource" label="Datasource" value={graphOption.datasource} defaultOption="Select Data Source" options={allAllowedSources} onChange={onChange} error={errors.datasource} />
			<SelectInput name="filter" label="Filter" value={graphOption.filter} defaultOption="Select Filter" options={allAlowedFilters} onChange={onChange} error={errors.filter} />
			<SelectInput name="granularity" label="Granularity" value={graphOption.granularity} defaultOption="Select Granularity" options={allAlowedGranularities} onChange={onChange} error={errors.granularity} />
			<DatePicker hintText="Start time" />
			<DatePicker hintText="End time" />
			<button style={prevStyles} onClick={onSave}>Preview</button>
			<button style={saveStyles} onClick={onSave}>Save</button>
		</form>
	);
};

OptionForm.propTypes = {

};

export default OptionForm;