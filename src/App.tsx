import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, CircularProgress, Alert, Snackbar } from '@mui/material';
import { SearchForm } from './components/SearchForm/SearchForm';
import { PassTable } from './components/PassTable/PassTable';
import { api, Pass } from './services/api';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [currentPlateNumber, setCurrentPlateNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (plateNumber: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPasses(plateNumber);
      setPasses(data);
      setCurrentPlateNumber(plateNumber);
    } catch (error) {
      console.error('Error searching passes:', error);
      setError('Ошибка при получении данных. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <SearchForm onSearch={handleSearch} />
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>
        ) : (
          <PassTable passes={passes} plateNumber={currentPlateNumber} />
        )}
        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
