import pandas as pd
import numpy as np
import csv
testDatasourcePath = 'datatest/datasource.csv'
testForbiddenDatasourcePath = 'datatest/forbidden_datasource.csv'

# getting a date range index

startDate = '2015-01-01'
endDate = '2019-01-01'
freq = '5H'
print('Generating data from ' + startDate + ' to ' + endDate + ' with a freq of ' + freq + '... ')
idx = pd.date_range(startDate, endDate, freq=freq)
datasource = pd.DataFrame([], index=idx)
remove_n = int(0.3*len(idx))
drop_indices = np.random.choice(datasource.index, remove_n, replace=False)
datasource = datasource.drop(drop_indices)
datasource['scannerID'] = np.random.randint(5, size=len(datasource.index))
datasource['roomID'] = np.random.randint(3, size=len(datasource.index))


forbiddenDatasource = pd.DataFrame([], index=idx)
forbiddenDatasource['dimension1'] = np.random.randint(5, size=len(idx))

datasource.to_csv(testDatasourcePath, index_label='date', header=None, quoting=csv.QUOTE_NONE)
forbiddenDatasource.to_csv(testForbiddenDatasourcePath, index_label='date',header=None, quoting=csv.QUOTE_NONE)

print('Data generated.')