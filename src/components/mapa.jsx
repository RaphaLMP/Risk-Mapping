import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, useMap, Circle
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const riscoIcons = {
  alagamento: new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    className: 'marker-alagamento'
  }),
  deslizamento: new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    className: 'marker-deslizamento'
  }),
  incendio: new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    className: 'marker-incendio'
  })
};

const riscoCores = {
  alagamento: { color: 'blue', fillColor: 'blue', fillOpacity: 0.2 },
  deslizamento: { color: 'brown', fillColor: 'brown', fillOpacity: 0.2 },
  incendio: { color: 'red', fillColor: 'red', fillOpacity: 0.2 }
};

const LocationUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 15);
  }, [position, map]);
  return null;
};

const Mapa = () => {
  const [position, setPosition] = useState([-23.5505, -46.6333]); // São Paulo padrão
  const [hasLocation, setHasLocation] = useState(false);
  const [minhaOcorrencia, setMinhaOcorrencia] = useState(null); // Para marcar onde EU marquei minha ocorrência
  const [chatRoom, setChatRoom] = useState('geral');
  const [localRoomId, setLocalRoomId] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos'); // Novo estado para filtro
  const [messages, setMessages] = useState({
    'geral': [
      { hora: '10:15', texto: 'Bem-vindo ao chat geral!' },
      { hora: '10:16', texto: 'Como posso ajudar hoje?' }
    ]
  });
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [riscoSelecionado, setRiscoSelecionado] = useState('');

  const [botaoModo, setBotaoModo] = useState('visualizar');

  const [outrasOcorrencias, setOutrasOcorrencias] = useState([
    {
      id: 1,
      tipo: 'alagamento',
      posicao: [-23.5405, -46.6233],
      descricao: 'Alagamento na Av. Paulista',
      dataHora: '18/05/2025 09:23',
      raio: 300
    },
    {
      id: 2,
      tipo: 'deslizamento',
      posicao: [-23.5705, -46.6483],
      descricao: 'Deslizamento na encosta sul',
      dataHora: '17/05/2025 19:45',
      raio: 200
    },
    {
      id: 3,
      tipo: 'incendio',
      posicao: [-23.5355, -46.6533],
      descricao: 'Incêndio no Edifício Central',
      dataHora: '18/05/2025 11:07',
      raio: 150
    }
  ]);
  
  // Simulações para o mapa local
  const [simulacoesLocais, setSimulacoesLocais] = useState([
    {
      id: 101,
      tipo: 'alagamento',
      posicao: [-23.5505, -46.6383],
      descricao: 'Simulação de Alagamento - Nível Crítico',
      dataHora: '18/05/2025 16:30',
      raio: 250,
      isSimulacao: true
    },
    {
      id: 102,
      tipo: 'deslizamento',
      posicao: [-23.5455, -46.6283],
      descricao: 'Simulação de Deslizamento - Cenário Projetado',
      dataHora: '19/05/2025 08:00',
      raio: 180,
      isSimulacao: true
    }
  ]);

  // Função para filtrar ocorrências baseada no filtro selecionado
  const filtrarOcorrencias = (ocorrencias) => {
    if (filtroTipo === 'todos') return ocorrencias;
    return ocorrencias.filter(ocorrencia => ocorrencia.tipo === filtroTipo);
  };

  const obterLocalizacao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          const newPosition = [latitude, longitude];
          setPosition(newPosition);
          setHasLocation(true);

          const roundedLat = latitude.toFixed(3);
          const roundedLng = longitude.toFixed(3);
          const roomId = `${roundedLat}-${roundedLng}`;
          setLocalRoomId(roomId);

          const roomKey = `local-${roomId}`;
          setMessages(prev => {
            if (!prev[roomKey]) {
              const currentTime = new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              });
              
              return {
                ...prev,
                [roomKey]: [{ 
                  hora: currentTime, 
                  texto: `Localização visualizada em ${roundedLat}, ${roundedLng}` 
                }]
              };
            }
            return prev;
          });

          setBotaoModo('marcar');
          setChatRoom(roomKey);

          const novasSimulacoes = [
            {
              id: Math.floor(Math.random() * 1000) + 200,
              tipo: 'alagamento',
              posicao: [latitude + 0.005, longitude - 0.003],
              descricao: 'Simulação de alagamento baseada na sua localização',
              dataHora: new Date().toLocaleString('pt-BR'),
              raio: 200,
              isSimulacao: true
            },
            {
              id: Math.floor(Math.random() * 1000) + 200,
              tipo: 'incendio',
              posicao: [latitude - 0.003, longitude + 0.004],
              descricao: 'Simulação de incêndio próximo à sua localização',
              dataHora: new Date().toLocaleString('pt-BR'),
              raio: 150,
              isSimulacao: true
            }
          ];
          
          setSimulacoesLocais(novasSimulacoes);
        },
        (error) => alert("Erro ao obter localização: " + error.message)
      );
    } else {
      alert("Geolocalização não é suportada.");
    }
  };

  const handleBotaoPrincipal = () => {
    if (botaoModo === 'marcar') {
      setModalVisible(true);
    } else {
      obterLocalizacao();
    }
  };

  const handleModalOk = () => {
    if (!riscoSelecionado) return;
    setModalVisible(false);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          const newPosition = [latitude, longitude];
          setPosition(newPosition);
          setHasLocation(true);
          
          // IMPORTANTE: Marcar onde EU criei minha ocorrência
          setMinhaOcorrencia({
            posicao: newPosition,
            tipo: riscoSelecionado
          });

          const roundedLat = latitude.toFixed(3);
          const roundedLng = longitude.toFixed(3);
          const roomId = `${roundedLat}-${roundedLng}`;
          setLocalRoomId(roomId);
          
          const novaOcorrencia = {
            id: outrasOcorrencias.length + 10,
            tipo: riscoSelecionado,
            posicao: newPosition,
            descricao: `${riscoSelecionado.charAt(0).toUpperCase() + riscoSelecionado.slice(1)} reportado por usuário`,
            dataHora: new Date().toLocaleString('pt-BR'),
            raio: 300,
            minhaOcorrencia: true // Marcar que essa é minha ocorrência
          };
          
          setOutrasOcorrencias(prev => [...prev, novaOcorrencia]);
          
          const roomKey = `local-${roomId}`;
          setMessages(prev => {
            if (!prev[roomKey]) {
              const currentTime = new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              });
              
              return {
                ...prev,
                [roomKey]: [{ 
                  hora: currentTime, 
                  texto: `Localização marcada: ${riscoSelecionado} em ${roundedLat}, ${roundedLng}` 
                }]
              };
            }
            return prev;
          });
          
          setChatRoom(roomKey);
          setBotaoModo('visualizar');
          
          const novasSimulacoes = [];

          if (riscoSelecionado === 'alagamento') {
            novasSimulacoes.push({
              id: Math.floor(Math.random() * 1000) + 200,
              tipo: 'alagamento',
              posicao: [latitude + 0.005, longitude - 0.003],
              descricao: 'Simulação de propagação de alagamento em 2h',
              dataHora: new Date().toLocaleString('pt-BR'),
              raio: 500,
              isSimulacao: true
            });
          } else if (riscoSelecionado === 'deslizamento') {
            novasSimulacoes.push({
              id: Math.floor(Math.random() * 1000) + 200,
              tipo: 'deslizamento',
              posicao: [latitude - 0.002, longitude + 0.002],
              descricao: 'Simulação de área de risco de deslizamento',
              dataHora: new Date().toLocaleString('pt-BR'),
              raio: 350,
              isSimulacao: true
            });
          } else if (riscoSelecionado === 'incendio') {
            novasSimulacoes.push({
              id: Math.floor(Math.random() * 1000) + 200,
              tipo: 'incendio',
              posicao: [latitude - 0.003, longitude + 0.004],
              descricao: 'Simulação de propagação de incêndio com vento atual',
              dataHora: new Date().toLocaleString('pt-BR'),
              raio: 400,
              isSimulacao: true
            });
          }
          
          setSimulacoesLocais(prev => [...prev, ...novasSimulacoes]);
        },
        (error) => alert("Erro ao obter localização: " + error.message)
      );
    } else {
      alert("Geolocalização não é suportada.");
    }

    setRiscoSelecionado('');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setRiscoSelecionado('');
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    const currentTime = new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setMessages((prev) => ({
      ...prev,
      [chatRoom]: [
        ...(prev[chatRoom] || []),
        { hora: currentTime, texto: input.trim() }
      ]
    }));
    
    setInput('');
  };
  
  const selecionarOcorrencia = (ocorrencia) => {
    const lat = ocorrencia.posicao[0].toFixed(3);
    const lng = ocorrencia.posicao[1].toFixed(3);
    const roomId = `${lat}-${lng}`;
    setLocalRoomId(roomId);
    
    const roomKey = `local-${roomId}`;
    setMessages(prev => {
      if (!prev[roomKey]) {
        return {
          ...prev,
          [roomKey]: [{ 
            hora: ocorrencia.dataHora.substring(11, 16), 
            texto: `${ocorrencia.tipo.charAt(0).toUpperCase() + ocorrencia.tipo.slice(1)}${ocorrencia.isSimulacao ? ' (SIMULAÇÃO)' : ''}: ${ocorrencia.descricao}` 
          }]
        };
      }
      return prev;
    });
    
    setChatRoom(roomKey);
    setPosition(ocorrencia.posicao);
    // NÃO alterar hasLocation aqui - deixar apenas para visualizar
    
    setBotaoModo('visualizar');
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-row gap-4 h-[70vh]">
        <div className="w-[70%] rounded shadow overflow-hidden">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationUpdater position={position} />
            
            {/* APENAS mostrar "Você está aqui!" onde EU marquei minha ocorrência */}
            {minhaOcorrencia && (
              <>
                <Marker position={minhaOcorrencia.posicao}>
                  <Popup>Você está aqui!</Popup>
                </Marker>
                <Circle
                  center={minhaOcorrencia.posicao}
                  radius={300}
                  pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.2 }}
                />
              </>
            )}
            
            {/* Outras ocorrências no mapa (filtradas) */}
            {filtrarOcorrencias(outrasOcorrencias).map(ocorrencia => (
              <React.Fragment key={ocorrencia.id}>
                <Marker 
                  position={ocorrencia.posicao}
                  icon={riscoIcons[ocorrencia.tipo]}
                  eventHandlers={{
                    click: () => selecionarOcorrencia(ocorrencia)
                  }}
                >
                  <Popup>
                    <div>
                      <strong>{ocorrencia.descricao}</strong>
                      <p>Tipo: {ocorrencia.tipo}</p>
                      <p>Data/Hora: {ocorrencia.dataHora}</p>
                      {ocorrencia.minhaOcorrencia && (
                        <p className="text-green-600 font-bold">Sua ocorrência</p>
                      )}
                      <button 
                        onClick={() => selecionarOcorrencia(ocorrencia)}
                        style={{
                          padding: '3px 8px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        Ver chat local
                      </button>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={ocorrencia.posicao}
                  radius={ocorrencia.raio}
                  pathOptions={riscoCores[ocorrencia.tipo]}
                />
              </React.Fragment>
            ))}
            
            {/* Simulações no mapa local (filtradas) */}
            {filtrarOcorrencias(simulacoesLocais).map(simulacao => (
              <React.Fragment key={simulacao.id}>
                <Marker 
                  position={simulacao.posicao}
                  icon={riscoIcons[simulacao.tipo]}
                  eventHandlers={{
                    click: () => selecionarOcorrencia(simulacao)
                  }}
                >
                  <Popup>
                    <div>
                      <strong>{simulacao.descricao} (SIMULAÇÃO)</strong>
                      <p>Tipo: {simulacao.tipo}</p>
                      <p>Data/Hora: {simulacao.dataHora}</p>
                      <p className="text-orange-500 font-bold">Isso é uma simulação</p>
                      <button 
                        onClick={() => selecionarOcorrencia(simulacao)}
                        style={{
                          padding: '3px 8px',
                          backgroundColor: '#ff9800',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        Ver detalhes da simulação
                      </button>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={simulacao.posicao}
                  radius={simulacao.raio}
                  pathOptions={{
                    ...riscoCores[simulacao.tipo],
                    dashArray: '5, 10', 
                    fillOpacity: 0.15
                  }}
                />
              </React.Fragment>
            ))}
          </MapContainer>
        </div>

        <div className="w-[30%] bg-white border rounded shadow p-4 flex flex-col">
          {/* Abas do Chat */}
          <div className="flex border-b mb-2">
            <button
              className={`flex-1 py-1 text-sm ${chatRoom === 'geral'
                  ? 'border-b-2 border-blue-500 font-bold text-blue-600'
                  : 'text-gray-500'
                }`}
              onClick={() => setChatRoom('geral')}
            >
              Geral
            </button>
            <button
              disabled={!hasLocation}
              className={`flex-1 py-1 text-sm ${chatRoom.startsWith('local-')
                  ? 'border-b-2 border-blue-500 font-bold text-blue-600'
                  : hasLocation ? 'text-gray-500' : 'text-gray-300 cursor-not-allowed'
                }`}
              onClick={() => hasLocation && setChatRoom(`local-${localRoomId}`)}
            >
              Local
            </button>
          </div>

          {/* Cabeçalho dinâmico */}
          <h2 className="text-md font-semibold mb-2 text-center">
            {chatRoom === 'geral' ? 'Chat Geral' : `Chat Local (${chatRoom.replace('local-', '')})`}
          </h2>

          {/* Mensagens */}
          <div className="flex-grow h-64 overflow-y-auto border p-1 rounded mb-2 bg-gray-50">
            {(messages[chatRoom] || []).map((msg, idx) => (
              <div key={idx} className="mb-1 text-xs">
                <span className="font-semibold text-gray-600">{msg.hora}:</span> {msg.texto}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Entrada de mensagem */}
          <div className="flex gap-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow min-w-0 border px-2 py-1 rounded text-sm"
              placeholder="Digite sua mensagem..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
            >
              Enviar
            </button>
          </div>
          
          {/* Legenda */}
          <div className="mt-4 text-xs border-t pt-2">
            <h3 className="font-semibold mb-1">Legenda:</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Alagamento</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-brown-500 mr-1" style={{backgroundColor: 'brown'}}></div>
                <span>Deslizamento</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span>Incêndio</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span>Sua localização</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{border: '2px dashed orange', backgroundColor: 'transparent'}}></div>
                <span>Simulação</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtro de Ocorrências */}
      <div className="mt-4 w-[70%] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-sm">Filtrar por tipo:</label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="todos">Todos</option>
            <option value="alagamento">Alagamento</option>
            <option value="deslizamento">Deslizamento</option>
            <option value="incendio">Incêndio</option>
          </select>
        </div>

        {/* Botão Principal (Marcar Localização ou Visualizar Local) */}
        <button
          onClick={handleBotaoPrincipal}
          className={`text-white px-4 py-2 rounded hover:opacity-90 mr-5 ${
            botaoModo === 'marcar' 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {botaoModo === 'marcar' ? 'Marcar Localização' : 'Visualizar Local'}
        </button>
      </div>

      {/* Lista de ocorrências recentes (filtradas) */}
      <div className="mt-4 w-[70%]">
        <h3 className="font-semibold mb-2">
          Ocorrências Recentes {filtroTipo !== 'todos' && `(${filtroTipo})`}:
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {filtrarOcorrencias(outrasOcorrencias).map(ocorrencia => (
            <div 
              key={ocorrencia.id}
              className={`p-2 border rounded shadow-sm cursor-pointer hover:bg-gray-50 ${
                ocorrencia.minhaOcorrencia ? 'bg-green-50 border-green-300' : 'bg-white'
              }`}
              onClick={() => selecionarOcorrencia(ocorrencia)}
            >
              <div className="font-semibold text-sm">{ocorrencia.descricao}</div>
              <div className="text-xs text-gray-600">{ocorrencia.dataHora}</div>
              <div className="text-xs mt-1 flex justify-between">
                <span className={`px-2 py-0.5 rounded text-white bg-${ocorrencia.tipo === 'alagamento' ? 'blue' : ocorrencia.tipo === 'deslizamento' ? 'yellow' : 'red'}-500`}>
                  {ocorrencia.tipo}
                </span>
                {ocorrencia.minhaOcorrencia && (
                  <span className="px-2 py-0.5 rounded text-white bg-green-500">
                    MINHA
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lista de simulações (filtradas) */}
      {filtrarOcorrencias(simulacoesLocais).length > 0 && (
        <div className="mt-4 w-[70%]">
          <h3 className="font-semibold mb-2">
            Simulações Ativas {filtroTipo !== 'todos' && `(${filtroTipo})`}:
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {filtrarOcorrencias(simulacoesLocais).map(simulacao => (
              <div 
                key={simulacao.id}
                className="p-2 border border-orange-300 rounded bg-orange-50 shadow-sm cursor-pointer hover:bg-orange-100"
                onClick={() => selecionarOcorrencia(simulacao)}
              >
                <div className="font-semibold text-sm">{simulacao.descricao}</div>
                <div className="text-xs text-gray-600">{simulacao.dataHora}</div>
                <div className="text-xs mt-1 flex justify-between">
                  <span className={`px-2 py-0.5 rounded text-white bg-${simulacao.tipo === 'alagamento' ? 'blue' : simulacao.tipo === 'deslizamento' ? 'yellow' : 'red'}-500`}>
                    {simulacao.tipo}
                  </span>
                  <span className="px-2 py-0.5 rounded text-white bg-orange-500">
                    SIMULAÇÃO
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modalVisible && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white', padding: 20, borderRadius: 8, width: 300,
          }}>
            <h2>Qual o tipo de risco?</h2>
            <select
              value={riscoSelecionado}
              onChange={e => setRiscoSelecionado(e.target.value)}
              style={{ width: '100%', marginBottom: 15 }}
            >
              <option value="">Selecione...</option>
              <option value="alagamento">Alagamento</option>
              <option value="deslizamento">Deslizamento</option>
              <option value="incendio">Incêndio</option>
            </select>

            <div style={{
              border: '1px solid #ccc', height: 150, marginBottom: 15,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              color: '#888',
            }}>
              Área para enviar foto (visual)
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={handleModalCancel} style={{ padding: '5px 10px' }}>Cancelar</button>
              <button
                onClick={handleModalOk}
                disabled={!riscoSelecionado}
                style={{ padding: '5px 10px' }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapa;