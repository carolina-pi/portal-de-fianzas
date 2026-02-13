import React, { useState } from 'react';
import { Search, FileText, Download, Eye, LogOut, Building2, Calendar, DollarSign, AlertCircle, Clock, TrendingUp } from 'lucide-react';

const PortalFianzas = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFianza, setSelectedFianza] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todas');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const colors = {
    primary: '#58C5C7',
    primaryDark: '#48B5B7',
    primaryLight: '#E0F7F7',
    secondary: '#5A5C66',
    secondaryDark: '#4A4C56',
    accent: '#7DD3D5',
    lightGray: '#5A5C66'
  };

  const usuarios = [
    { id: 1, username: 'cliente1', password: 'demo123', nombre: 'Constructora ABC S.A.' },
    { id: 2, username: 'cliente2', password: 'demo123', nombre: 'Empresa XYZ Ltda.' }
  ];

  const calcularDiasRestantes = (fechaFin) => {
    const hoy = new Date();
    const fin = new Date(fechaFin);
    const diff = Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const calcularDiasPlazo = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24));
  };

  const calcularFechaMaximaReclamo = (fechaFin) => {
    const fin = new Date(fechaFin);
    fin.setDate(fin.getDate() + 180);
    return fin.toISOString().split('T')[0];
  };

  const fianzasData = {
    1: [
      {
        contratista: 'Constructora ABC S.A.',
        beneficiario: 'Gobierno Municipal de Monterrey',
        contrato: 'CTR-2024-001',
        inicioPlazoEjecucion: '2024-01-15',
        finPlazoEjecucion: '2025-01-15',
        estado: 'En Ejecución',
        afianzadora: 'Afianzadora Insurgentes',
        montoAfianzado: 500000,
        numeroFianza: 'F-2024-001',
        riesgo: 'Cumplimiento',
        estatus: 'Vigente',
        proyecto: 'Construcción Puente Norte - Fase 1',
        inicioVigenciaFianza: '2024-01-15',
        finVigenciaFianza: '2025-07-15',
        fechaEmision: '2024-01-10',
        ultimoMovimiento: '2024-02-01 - Emisión inicial',
        pdfUrl: '#'
      },
      {
        contratista: 'Constructora ABC S.A.',
        beneficiario: 'Secretaría de Obras Públicas',
        contrato: 'CTR-2024-002',
        inicioPlazoEjecucion: '2024-02-20',
        finPlazoEjecucion: '2024-12-20',
        estado: 'En Ejecución',
        afianzadora: 'Afianzadora del Centro',
        montoAfianzado: 250000,
        numeroFianza: 'F-2024-002',
        riesgo: 'Anticipo',
        estatus: 'Vigente',
        proyecto: 'Obras Viales Sector Sur - Modernización',
        inicioVigenciaFianza: '2024-02-20',
        finVigenciaFianza: '2025-02-20',
        fechaEmision: '2024-02-15',
        ultimoMovimiento: '2024-03-15 - Modificación de monto',
        pdfUrl: '#'
      },
      {
        contratista: 'Constructora ABC S.A.',
        beneficiario: 'Instituto Nacional de Infraestructura',
        contrato: 'CTR-2023-045',
        inicioPlazoEjecucion: '2023-06-10',
        finPlazoEjecucion: '2024-06-10',
        estado: 'Concluido',
        afianzadora: 'Afianzadora Nacional',
        montoAfianzado: 180000,
        numeroFianza: 'F-2023-045',
        riesgo: 'Cumplimiento',
        estatus: 'Vencida',
        proyecto: 'Remodelación Edificio Central - Acabados',
        inicioVigenciaFianza: '2023-06-10',
        finVigenciaFianza: '2024-12-10',
        fechaEmision: '2023-06-05',
        ultimoMovimiento: '2024-06-11 - Vencimiento de fianza',
        pdfUrl: '#'
      }
    ],
    2: [
      {
        contratista: 'Empresa XYZ Ltda.',
        beneficiario: 'Corporación Industrial del Norte',
        contrato: 'CTR-2024-003',
        inicioPlazoEjecucion: '2024-03-01',
        finPlazoEjecucion: '2025-03-01',
        estado: 'En Ejecución',
        afianzadora: 'Afianzadora Metropolitana',
        montoAfianzado: 350000,
        numeroFianza: 'F-2024-003',
        riesgo: 'Garantía',
        estatus: 'Vigente',
        proyecto: 'Suministro de Equipos Industriales',
        inicioVigenciaFianza: '2024-03-01',
        finVigenciaFianza: '2025-09-01',
        fechaEmision: '2024-02-25',
        ultimoMovimiento: '2024-03-01 - Emisión inicial',
        pdfUrl: '#'
      }
    ]
  };

  const handleLogin = () => {
    const user = usuarios.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSelectedFianza(null);
  };

  const getFianzas = () => {
    if (!currentUser) return [];
    return fianzasData[currentUser.id] || [];
  };

  const filteredFianzas = getFianzas().filter(fianza => {
    const matchSearch = fianza.numeroFianza.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       fianza.proyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       fianza.beneficiario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       fianza.contrato.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'todas' || fianza.estatus.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  };

  const getStatusColor = (estatus) => {
    switch(estatus.toLowerCase()) {
      case 'vigente': return 'bg-green-100 text-green-800';
      case 'vencida': return 'bg-red-100 text-red-800';
      case 'próxima a vencer': return 'bg-yellow-100 text-yellow-800';
      case 'en proceso': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.accent} 100%)`}}>
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{backgroundColor: colors.primary}}>
              <FileText className="text-white" size={48} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{color: colors.secondary}}>Portal de Fianzas</h1>
            <p className="text-gray-600">Acceso a Clientes</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: colors.lightGray}}>Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-all"
                onFocus={(e) => e.target.style.borderColor = colors.primary}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                placeholder="Ingrese su usuario"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: colors.lightGray}}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-all"
                onFocus={(e) => e.target.style.borderColor = colors.primary}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                placeholder="Ingrese su contraseña"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full text-white py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
              style={{backgroundColor: colors.primary}}
              onMouseOver={(e) => e.target.style.backgroundColor = colors.primaryDark}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
            >
              Iniciar Sesión
            </button>
          </div>
          
          <div className="mt-6 p-4 rounded-lg text-sm" style={{backgroundColor: colors.primaryLight}}>
            <p className="font-semibold mb-2" style={{color: colors.secondary}}>Credenciales de prueba:</p>
            <p style={{color: colors.lightGray}}>Usuario: <span className="font-mono font-bold">cliente1</span></p>
            <p style={{color: colors.lightGray}}>Contraseña: <span className="font-mono font-bold">demo123</span></p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedFianza) {
    const diasPlazo = calcularDiasPlazo(selectedFianza.inicioPlazoEjecucion, selectedFianza.finPlazoEjecucion);
    const diasRestantes = calcularDiasRestantes(selectedFianza.finPlazoEjecucion);
    const fechaMaximaReclamo = calcularFechaMaximaReclamo(selectedFianza.finVigenciaFianza);
    const restantesReclamacion = calcularDiasRestantes(fechaMaximaReclamo);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primary}}>
                <FileText className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold" style={{color: colors.secondary}}>Detalle de Fianza</h1>
            </div>
            <button
              onClick={() => setSelectedFianza(null)}
              className="px-6 py-2 text-white rounded-lg transition-all font-medium"
              style={{backgroundColor: colors.secondary}}
              onMouseOver={(e) => e.target.style.backgroundColor = colors.secondaryDark}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.secondary}
            >
              ← Volver al listado
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-8 pb-6 border-b-2" style={{borderColor: colors.primaryLight}}>
              <div>
                <h2 className="text-4xl font-bold mb-3" style={{color: colors.primary}}>{selectedFianza.numeroFianza}</h2>
                <div className="flex gap-2">
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedFianza.estatus)}`}>
                    {selectedFianza.estatus}
                  </span>
                  <span className="px-4 py-1 rounded-full text-sm font-semibold" style={{backgroundColor: colors.primaryLight, color: colors.secondary}}>
                    {selectedFianza.riesgo}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm mb-1">Monto Afianzado</p>
                <p className="text-4xl font-bold" style={{color: colors.primary}}>{formatCurrency(selectedFianza.montoAfianzado)}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4" style={{color: colors.secondary}}>Información del Proyecto</h3>
              <div className="p-4 rounded-lg" style={{backgroundColor: colors.primaryLight}}>
                <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.proyecto}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg shadow-md" style={{backgroundColor: colors.primaryLight}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{color: colors.secondary}}>Días de Plazo</p>
                    <p className="text-3xl font-bold mt-1" style={{color: colors.primary}}>{diasPlazo}</p>
                  </div>
                  <Calendar style={{color: colors.primary}} size={36} />
                </div>
              </div>

              <div className="p-4 rounded-lg shadow-md" style={{backgroundColor: selectedFianza.estatus === 'Vigente' ? '#F0FDF4' : '#FEF2F2'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{color: colors.secondary}}>Días Restantes</p>
                    <p className="text-3xl font-bold mt-1" style={{color: selectedFianza.estatus === 'Vigente' ? '#16A34A' : '#DC2626'}}>
                      {diasRestantes}
                    </p>
                  </div>
                  <Clock style={{color: selectedFianza.estatus === 'Vigente' ? '#16A34A' : '#DC2626'}} size={36} />
                </div>
              </div>

              <div className="p-4 rounded-lg shadow-md" style={{backgroundColor: '#FEF3C7'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{color: colors.secondary}}>Días para Reclamar</p>
                    <p className="text-3xl font-bold mt-1 text-yellow-700">{restantesReclamacion}</p>
                  </div>
                  <AlertCircle className="text-yellow-700" size={36} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Contratista</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.contratista}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Beneficiario (Contratante)</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.beneficiario}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Número de Contrato</p>
                  <p className="text-lg font-semibold" style={{color: colors.primary}}>{selectedFianza.contrato}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Afianzadora</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.afianzadora}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Estado del Contrato</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.estado}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Inicio Plazo de Ejecución</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.inicioPlazoEjecucion}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Fin Plazo de Ejecución</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.finPlazoEjecucion}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Inicio Vigencia de la Fianza</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.inicioVigenciaFianza}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Fin Vigencia de la Fianza</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.finVigenciaFianza}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Fecha Máxima de Reclamo (180 días)</p>
                  <p className="text-lg font-semibold text-yellow-700">{fechaMaximaReclamo}</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 pt-6 mb-6" style={{borderColor: colors.primaryLight}}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Fecha de Emisión</p>
                  <p className="text-lg font-semibold" style={{color: colors.secondary}}>{selectedFianza.fechaEmision}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Último Movimiento</p>
                  <p className="text-lg" style={{color: colors.secondary}}>{selectedFianza.ultimoMovimiento}</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 pt-6" style={{borderColor: colors.primaryLight}}>
              <h3 className="text-lg font-semibold mb-4" style={{color: colors.secondary}}>Documento de Fianza</h3>
              <div className="rounded-lg p-6 flex items-center justify-between shadow-md" style={{backgroundColor: colors.primaryLight}}>
                <div className="flex items-center">
                  <FileText style={{color: colors.primary}} size={48} className="mr-4" />
                  <div>
                    <p className="font-semibold text-lg" style={{color: colors.secondary}}>Fianza_{selectedFianza.numeroFianza}.pdf</p>
                    <p className="text-sm text-gray-600">Documento PDF - 245 KB</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    className="px-6 py-2 text-white rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    style={{backgroundColor: colors.primary}}
                    onMouseOver={(e) => e.target.style.backgroundColor = colors.primaryDark}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
                  >
                    <Eye size={18} />
                    Ver
                  </button>
                  <button 
                    className="px-6 py-2 text-white rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    style={{backgroundColor: colors.secondary}}
                    onMouseOver={(e) => e.target.style.backgroundColor = colors.secondaryDark}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.secondary}
                  >
                    <Download size={18} />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b-2" style={{borderColor: colors.primary}}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: colors.primary}}>
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{color: colors.secondary}}>Portal de Fianzas</h1>
              <p className="text-sm text-gray-600">{currentUser.nombre}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 text-white rounded-lg transition-all font-medium shadow-md"
            style={{backgroundColor: colors.secondary}}
            onMouseOver={(e) => e.target.style.backgroundColor = colors.secondaryDark}
            onMouseOut={(e) => e.target.style.backgroundColor = colors.secondary}
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{borderColor: colors.primary}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Fianzas</p>
                <p className="text-3xl font-bold mt-2" style={{color: colors.secondary}}>{getFianzas().length}</p>
              </div>
              <FileText style={{color: colors.primary}} size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Fianzas Vigentes</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {getFianzas().filter(f => f.estatus === 'Vigente').length}
                </p>
              </div>
              <AlertCircle className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{borderColor: colors.accent}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Monto Total</p>
                <p className="text-2xl font-bold mt-2" style={{color: colors.primary}}>
                  {formatCurrency(getFianzas().reduce((sum, f) => sum + f.montoAfianzado, 0))}
                </p>
              </div>
              <DollarSign style={{color: colors.primary}} size={40} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por número, contrato, proyecto o beneficiario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all"
                onFocus={(e) => e.target.style.borderColor = colors.primary}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-all"
              style={{color: colors.secondary}}
              onFocus={(e) => e.target.style.borderColor = colors.primary}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            >
              <option value="todas">Todas las fianzas</option>
              <option value="vigente">Vigentes</option>
              <option value="vencida">Vencidas</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{backgroundColor: colors.primaryLight}}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Contratista</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Beneficiario</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Contrato</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Plazo Ejecución</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Afianzadora</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Monto</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>No. Fianza</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Riesgo</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Estatus</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{color: colors.secondary}}>Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFianzas.map((fianza, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4"><span className="text-sm font-medium text-gray-800">{fianza.contratista}</span></td>
                    <td className="px-4 py-4"><span className="text-sm text-gray-800">{fianza.beneficiario}</span></td>
                    <td className="px-4 py-4 whitespace-nowrap"><span className="text-sm font-semibold" style={{color: colors.primary}}>{fianza.contrato}</span></td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-gray-600">{fianza.inicioPlazoEjecucion}</div>
                      <div className="text-xs text-gray-600">{fianza.finPlazoEjecucion}</div>
                    </td>
                    <td className="px-4 py-4"><span className="text-sm text-gray-800">{fianza.afianzadora}</span></td>
                    <td className="px-4 py-4 whitespace-nowrap"><span className="font-semibold text-sm" style={{color: colors.secondary}}>{formatCurrency(fianza.montoAfianzado)}</span></td>
                    <td className="px-4 py-4 whitespace-nowrap"><span className="font-bold text-sm" style={{color: colors.primary}}>{fianza.numeroFianza}</span></td>
                    <td className="px-4 py-4 whitespace-nowrap"><span className="text-sm text-gray-700">{fianza.riesgo}</span></td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(fianza.estatus)}`}>{fianza.estatus}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedFianza(fianza)}
                        className="font-medium text-sm transition-colors px-3 py-1 rounded"
                        style={{color: colors.primary, backgroundColor: colors.primaryLight}}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = colors.primary;
                          e.target.style.color = '#FFFFFF';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = colors.primaryLight;
                          e.target.style.color = colors.primary;
                        }}
                      >
                        Ver detalles →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredFianzas.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">No se encontraron fianzas con los criterios de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalFianzas;
