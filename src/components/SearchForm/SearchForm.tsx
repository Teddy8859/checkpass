import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography,
  Container 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFormProps {
  onSearch: (plateNumber: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [plateNumber, setPlateNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(plateNumber);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Поиск пропусков
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Регистрационный знак"
            variant="outlined"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="А123БВ"
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            startIcon={<SearchIcon />}
          >
            Найти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}; 