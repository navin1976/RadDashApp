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

const OptionForm = ({graphOption,allAllowedSources,allAlowedFilters,allAlowedGranularities,allAlowedChartTypes,allAlowedMetrics,onSave,onChange,onDatasourceChange,onPreview,saving,errors}) => {
	return(
		<form>
			<h1>Manage graph</h1>
			<TextInput 
				name="title" 
				label="Title" 
				value={graphOption.title} 
				onChange={onChange} 
				error={errors.title}
			/>
			<TextInput 
				name="description" 
				label="Description" 
				value={graphOption.description} 
				onChange={onChange} 
				error={errors.description}
			/>
			<SelectInput 
				name="chartType" 
				label="Chart type" 
				value={graphOption.chartType} 
				defaultOption="Select chart type" 
				options={allAlowedChartTypes} 
				onChange={onChange} 
				error={errors.datasource} 
			/>
			<TextInput 
				name="width" 
				label="Width (in pixels)" 
				value={graphOption.width} 
				onChange={onChange} 
				error={errors.width}
			/>
			<TextInput 
				name="height" 
				label="Height (in pixels)" 
				value={graphOption.height} 
				onChange={onChange} 
				error={errors.height} 
			/>
			<SelectInput 
				name="datasource" 
				label="Datasource" 
				value={graphOption.datasource} 
				defaultOption="Select Data Source" 
				options={allAllowedSources} 
				onChange={onDatasourceChange} 
				error={errors.datasource} 
			/>
			<SelectInput 
				name="filter" 
				label="Filter" 
				value={graphOption.filter} 
				defaultOption="Select Filter" 
				options={allAlowedFilters} 
				onChange={onChange} 
				error={errors.filter} 
			/>
			<SelectInput 
				name="granularity" 
				label="Granularity" 
				value={graphOption.granularity} 
				defaultOption="Select Granularity" 
				options={allAlowedGranularities} 
				onChange={onChange} 
				error={errors.granularity} 
			/>
			<SelectInput 
				name="metric" 
				label="Metrics" 
				value={graphOption.metric} 
				defaultOption="Select Metrics" 
				options={allAlowedMetrics} 
				onChange={onChange} 
				error={errors.metric} 
			/>
			<TextInput 
				name="startTime" 
				label="Start time" 
				value={graphOption.startTime} 
				onChange={onChange} 
				error={errors.startTime}
			/>
			<TextInput 
				name="endTime" 
				label="End time" 
				value={graphOption.endTime} 
				onChange={onChange} 
				error={errors.endTime} 
			/>
			<button style={prevStyles} onClick={onPreview}>Preview</button>
			<button style={saveStyles} onClick={onSave}>Save</button>
		</form>
	);
};

OptionForm.propTypes = {

};

export default OptionForm;