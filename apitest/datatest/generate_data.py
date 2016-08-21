import pandas as pd
import numpy as np

testDatasourcePath = 'datatest/datasource.csv'
testForbiddenDatasourcePath = 'datatest/forbidden_datasource.csv'

# getting a date range index

startDate = '2015-01-01'
endDate = '2019-01-01'
freq = '5H'
print('Generating data from ' + startDate + ' to ' + endDate + ' with a freq of ' + freq + '... ')
idx = pd.date_range(startDate, endDate, freq=freq)
datasource = pd.DataFrame([], index=idx)
datasource['dimension1'] = np.random.randint(5, size=len(idx))
datasource['dimension2'] = np.random.randint(3, size=len(idx))

forbiddenDatasource = pd.DataFrame([], index=idx)
forbiddenDatasource['dimension1'] = np.random.randint(5, size=len(idx))

datasource.to_csv(testDatasourcePath, index_label='date')
forbiddenDatasource.to_csv(testForbiddenDatasourcePath, index_label='date')

print('Data generated.')