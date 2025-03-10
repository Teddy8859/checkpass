import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';

interface Pass {
  id: string;
  plateNumber: string;
  zone: string;
  startDate: string;
  endDate: string;
  type: string;
  period: string;
  status: string;
  daysLeft: number;
}

interface PassTableProps {
  passes: Pass[];
  plateNumber: string;
}

export const PassTable: React.FC<PassTableProps> = ({ passes, plateNumber }) => {
  if (passes.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Пропуска не найдены
        </Typography>
      </Box>
    );
  }

  const getRowStyle = (status: string) => {
    return {
      backgroundColor: status === 'Действующий' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
    };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDaysLeft = (daysLeft: number) => {
    return daysLeft < 0 ? '—' : daysLeft;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        История пропусков для {plateNumber}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Рег. знак</TableCell>
            <TableCell>Дата начала</TableCell>
            <TableCell>Дата окончания</TableCell>
            <TableCell>Зона действия</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell>Временной тип</TableCell>
            <TableCell>Осталось дней</TableCell>
            <TableCell>Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passes.map((pass) => (
            <TableRow key={pass.id} sx={getRowStyle(pass.status)}>
              <TableCell>{pass.plateNumber}</TableCell>
              <TableCell>{formatDate(pass.startDate)}</TableCell>
              <TableCell>{formatDate(pass.endDate)}</TableCell>
              <TableCell>{pass.zone}</TableCell>
              <TableCell>{pass.type}</TableCell>
              <TableCell>{pass.period}</TableCell>
              <TableCell>{formatDaysLeft(pass.daysLeft)}</TableCell>
              <TableCell>{pass.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 