


/* const ventana = {
  colores: [
    {
      nombre: "Blanco",
      color: ["Bronze", "Negro", "CranBerry", "Azul","Gris", "Rojo Caliente", "Metallic Silver", "Wicker"]
    },
    {
      nombre: "Clay",
      color: ["Bronze", "Negro", "Cranberry", "Azul", "Gris", "Rojo Caliente", "Metallic Silver", "Wicker"]
    }
  ],
  tipos: [
    {
      nombre: "Básica",
      ceja: [
        {
          nombre: "Ceja"
        },
        {
          nombre: "Ceja enfrente"
        }
      ],
      tipoVidrio: [
        {
          nombre: "Vidrio sencillo",
          tipos: [
            {
              nombre: "Claro"
            },
            {
              nombre: "Baño"
            },
            {
              nombre: "FiltraSol"
            },
            {
              nombre: "ReflecteSol"
            }
          ] 
        },
        {
          nombre: "Vidrio doble",
          tipos: [
            {
              nombre: "Claro"
            },
            {
              nombre: "Low-E"
            },
            {
              nombre: "Claro / Baño"
            },
            {
              nombre: "Low-E / Baño"
            },
            {
              nombre: "Low-E / FiltraSol"
            },
            {
              nombre: "Low-E / ReflecteSol"
            },
            {
              nombre: "FiltraSol / Claro"
            },
            {
              nombre: "FiltraSol / Baño"
            },
            {
              nombre: "ReflecteSol / Claro"
            },
            {
              nombre: "ReflecteSol / FiltraSol"
            },
            {
              nombre: "ReflecteSol / Baño UF"
            },
          ]
        },
        {
          nombre: "Vidrio doble con marginal",
          tipos: [
            {
              nombre: "Claro con marginal"
            },
            {
              nombre: "Low-E con marginal"
            },
            {
              nombre: "Claro / Baño con marginal"
            },
            {
              nombre: "Low-E / Baño con marginal"
            },
            {
              nombre: "Low-E / FiltraSol con marginal"
            },
            {
              nombre: "Low-E / ReflecteSol con marginal"
            },
            {
              nombre: "FiltraSol / Claro con marginal"
            },
            {
              nombre: "FiltraSol / Baño con marginal"
            },
            {
              nombre: "ReflecteSol / Claro con marginal"
            },
            {
              nombre: "ReflecteSol / FiltraSol con marginal"
            },
            {
              nombre: "ReflecteSol / Baño UF con marginal"
            },
          ]
        },
        {
          nombre: "Vidrio doble con cuadrícula",
          tipos: [
            {
              nombre: "Claro con cuadrícula"
            },
            {
              nombre: "Low-E con cuadrícula"
            },
            {
              nombre: "Claro / Baño con cuadrícula"
            },
            {
              nombre: "Low-E / Baño con cuadrícula"
            },
            {
              nombre: "Low-E / FiltraSol con cuadrícula"
            },
            {
              nombre: "Low-E / ReflecteSol con cuadrícula"
            },
            {
              nombre: "FiltraSol / Claro con cuadrícula"
            },
            {
              nombre: "FiltraSol / Baño con cuadrícula"
            },
            {
              nombre: "ReflecteSol / Claro con cuadrícula"
            },
            {
              nombre: "ReflecteSol / FiltraSol con cuadrícula"
            },
            {
              nombre: "ReflecteSol / Baño UF con cuadrícula"
            },
          ]
        }
      ],
      tipo: [
        {
          nombre: "Fijo Serie 40",
          subtipo: [
            {
              nombre: "Fija",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble fija apilada",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Triple fija apilada",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble fija",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Triple fija apilada",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        },
        {
          nombre: "Corrediza",
          subtipo: [
            {
              nombre: "Corrediza",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza XOX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza OX-O",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza O-XO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza O-XOX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        },
        {
          nombre: "Guillotina",
          subtipo: [
            {
              nombre: "Guillotina",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble guillotina",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "OXO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "XOX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Orio",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble orio",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "O-OX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Con arco continuo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        },
        {
          nombre: "Arcos y figuras",
          subtipo: [
            {
              nombre: "Triángulo isosceles",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Forma AO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Hexagonal",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Octagonal",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Triángulo rectángulo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Forma AO-O",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Figura AO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Figura AO-O",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Circular",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco media luna fijo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Media luna con un fijo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco A-O-O",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco media luna 3 fijos",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco AO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Fijo con arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco media luna con 2 fijos",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco AOOO luna con 3 fijos",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Catedral",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        },
      ]
    },
    {
      nombre: "Premium",
      ceja: [
        {
          nombre: "Ceja"
        },
        {
          nombre: "Ceja enfrente"
        }
      ],
      tipoVidrio: [
        {
          nombre: "Vidrio Doble",
          tipos: [
            {
              nombre: "Claro"
            },
            {
              nombre: "Low-E"
            },
            {
              nombre: "Claro / Baño"
            },
            {
              nombre: "Low-E / Baño"
            },
            {
              nombre: "Low-E / FiltraSol"
            },
            {
              nombre: "Low-E / ReflecteSol"
            },
            {
              nombre: "FiltraSol / Claro"
            },
            {
              nombre: "FiltraSol / Baño"
            },
            {
              nombre: "ReflecteSol / Claro"
            },
            {
              nombre: "ReflecteSol / FiltraSo"
            },
            {
              nombre: "ReflecteSol / Baño UF"
            }
          ]
        },
        {
          nombre: "Vidrio Doble con Marginal",
          tipos: [
            {
              nombre: "Claro con Marginal"
            },
            {
              nombre: "Low-E con Marginal"
            },
            {
              nombre: "Claro / Baño con Marginal"
            },
            {
              nombre: "Low-E / Baño con Marginal"
            },
            {
              nombre: "Low-E / FiltraSol con Marginal"
            },
            {
              nombre: "Low-E / ReflecteSol con Marginal"
            },
            {
              nombre: "FiltraSol / Claro con Marginal"
            },
            {
              nombre: "FiltraSol / Baño con Marginal"
            },
            {
              nombre: "ReflecteSol / Claro con Marginal"
            },
            {
              nombre: "ReflecteSol / FiltraSo con Marginal"
            },
            {
              nombre: "ReflecteSol / Baño UF con Marginal"
            }
          ]
        },
        {
          nombre: "Vidrio Doble con Cuadricula",
          tipos: [
            {
              nombre: "Claro con Cuadricula"
            },
            {
              nombre: "Low-E con Cuadricula"
            },
            {
              nombre: "Claro / Baño con Cuadricula"
            },
            {
              nombre: "Low-E / Baño con Cuadricula"
            },
            {
              nombre: "Low-E / FiltraSol con Cuadricula"
            },
            {
              nombre: "Low-E / ReflecteSol con Cuadricula"
            },
            {
              nombre: "FiltraSol / Claro con Cuadricula"
            },
            {
              nombre: "FiltraSol / Baño con Cuadricula"
            },
            {
              nombre: "ReflecteSol / Claro con Cuadricula"
            },
            {
              nombre: "ReflecteSol / FiltraSo con Cuadricula"
            },
            {
              nombre: "ReflecteSol / Baño UF con Cuadricula"
            }
          ]
        },
        {
          nombre: "Vidrio Triple ",
          tipos: [
            {
              nombre: "Low-E / Claro / Baño"
            },
            {
              nombre: "Low-E"
            },
            {
              nombre: "Low-E / Claro / FiltraSol"
            },
            {
              nombre: "Low-E / FiltraSol / Claro"
            },
            {
              nombre: "Low-E / FiltraSol / FiltraSol"
            },
            {
              nombre: "Low-E / FiltraSol / Baño"
            },
            {
              nombre: "Low-E / Low-E / Claro"
            },
            {
              nombre: "ReflecteSol / Claro / Claro"
            },
            {
              nombre: "ReflecteSol / FiltraSol / Claro"
            },
            {
              nombre: "ReflecteSol / Claro / FiltraSol"
            },
            {
              nombre: "ReflecteSol / Claro / Baño UF"
            }
          ]
        },
        {
          nombre: "Vidrio Triple con Marginal",
          tipos: [
            {
              nombre: "Low-E / Claro / Baño con Marginal"
            },
            {
              nombre: "Low-E con Marginal"
            },
            {
              nombre: "Low-E / Claro / FiltraSol con Marginal"
            },
            {
              nombre: "Low-E / FiltraSol / Claro con Marginal"
            },
            {
              nombre: "Low-E / FiltraSol / FiltraSol con Marginal"
            },
            {
              nombre: "Low-E / FiltraSol / Baño con Marginal"
            },
            {
              nombre: "Low-E / Low-E / Claro con Marginal"
            },
            {
              nombre: "ReflecteSol / Claro / Claro con Marginal"
            },
            {
              nombre: "ReflecteSol / FiltraSol / Claro con Marginal"
            },
            {
              nombre: "ReflecteSol / Claro / FiltraSol con Marginal"
            },
            {
              nombre: "ReflecteSol / Claro / Baño UF con Marginal"
            }
          ]
        },
        {
          nombre: "Vidrio Triple con Cuadricula",
          tipos: [
            {
              nombre: "Low-E / Claro / Baño con Cuadricula"
            },
            {
              nombre: "Low-E con Cuadricula"
            },
            {
              nombre: "Low-E / Claro / FiltraSol con Cuadricula"
            },
            {
              nombre: "Low-E / FiltraSol / Claro con Cuadricula"
            },
            {
              nombre: "Low-E / FiltraSol / FiltraSol con Cuadricula"
            },
            {
              nombre: "Low-E / FiltraSol / Baño con Cuadricula"
            },
            {
              nombre: "Low-E / Low-E / Claro con Cuadricula"
            },
            {
              nombre: "ReflecteSol / Claro / Claro con Cuadricula"
            },
            {
              nombre: "ReflecteSol / FiltraSol / Claro con Cuadricula"
            },
            {
              nombre: "ReflecteSol / Claro / FiltraSol con Cuadricula"
            },
            {
              nombre: "ReflecteSol / Claro / Baño UF con Cuadricula"
            }
          ]
        }, 
      ],
      tipo: [
        {
          nombre: "Fijo",
          subtipo: [
            {
              nombre: "Abatible Fijo",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatibles Fijos Apilados",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Doble Abatible Fijo",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Fija O-O-O",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Fijo O-O-O",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            }
          ]
        },
        {
          nombre: "Abatible",
          subtipo: [
            {
              nombre: "Abatible",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatible con Abatible Fijo",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatible XOX",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatible OXO",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatible X/O",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatible XX",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatible XOO-OOX",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            }
          ]
        },
        {
          nombre: "Proyectante",
          subtipo: [
            {
              nombre: "Abatiente",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatiente con Abatible Fijo",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatiente con Abatible Fijo Apilado",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatiente XOX",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatiente OXO",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Proyectante XXX",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Abatiente XXX",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Proyectante con 2 Fijos",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            },
            {
              nombre: "Doble Proyectante con Uno Fijo",
              dimensiones: [
                {
                  wMax: "72",
                  hMax: "72"
                },
                {
                  wMin: "20",
                  hMin: "35"
                }
              ]
            }
          ]
        },
      ]
    },
    {
      nombre: "Plus",
      ceja: [
        {
          nombre: "Ceja"
        },
        {
          nombre: "Ceja enfrente"
        }
      ],
      tipoVidrio: [
        {
          nombre: "Vidrio sencillo",
          tipos: [
            {
              nombre: "Claro"
            },
            {
              nombre: "Baño"
            },
            {
              nombre: "FiltraSol"
            },
            {
              nombre: "ReflecteSol"
            }
          ]
        },
        {
          nombre: "Vidrio doble",
          tipos: [
            {
              nombre: "Claro"
            },
            {
              nombre: "Low-E"
            },
            {
              nombre: "Claro / Baño"
            },
            {
              nombre: "Low-E / Baño"
            },
            {
              nombre: "Low-E / FiltraSol"
            },
            {
              nombre: "Low-E / ReflecteSol"
            },
            {
              nombre: "FiltraSol / Claro"
            },
            {
              nombre: "FiltraSol / Baño"
            },
            {
              nombre: "ReflecteSol / Claro"
            },
            {
              nombre: "ReflecteSol / FiltraSol"
            },
            {
              nombre: "ReflecteSol / Baño UF"
            }
          ]
        },
        {
          nombre: "Vidrio doble con marginal",
          tipos: [
            {
              nombre: "Claro con marginal"
            },
            {
              nombre: "Low-E con marginal"
            },
            {
              nombre: "Claro / Baño con marginal"
            },
            {
              nombre: "Low-E / Baño con marginal"
            },
            {
              nombre: "Low-E / FiltraSol con marginal"
            },
            {
              nombre: "Low-E / ReflecteSol con marginal"
            },
            {
              nombre: "FiltraSol / Claro con marginal"
            },
            {
              nombre: "FiltraSol / Baño con marginal"
            },
            {
              nombre: "ReflecteSol / Claro con marginal"
            },
            {
              nombre: "ReflecteSol / FiltraSol con marginal"
            },
            {
              nombre: "ReflecteSol / Baño UF con marginal"
            }
          ]
        },
        {
          nombre: "Vidrio doble con cuadrícula",
          tipos: [
            {
              nombre: "Claro con cuadrícula"
            },
            {
              nombre: "Low-E con cuadrícula"
            },
            {
              nombre: "Claro / Baño con cuadrícula"
            },
            {
              nombre: "Low-E / Baño con cuadrícula"
            },
            {
              nombre: "Low-E / FiltraSol con cuadrícula"
            },
            {
              nombre: "Low-E / ReflecteSol con cuadrícula"
            },
            {
              nombre: "FiltraSol / Claro con cuadrícula"
            },
            {
              nombre: "FiltraSol / Baño con cuadrícula"
            },
            {
              nombre: "ReflecteSol / Claro con cuadrícula"
            },
            {
              nombre: "ReflecteSol / FiltraSol con cuadrícula"
            },
            {
              nombre: "ReflecteSol / Baño UF con cuadrícula"
            }
          ]
        }
      ],
      tipo: [
        {
          nombre: "Fijo",
          subtipo: [
            {
              nombre: "Fijo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble fijo apilada",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Triple fija apilada",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble fija",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble fija",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Triple fija apilada",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        },
        {
          nombre: "Corrediza",
          subtipo: [
            {
              nombre: "Corrediza",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza XOX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza O-XO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza X-XOX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza con arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco media luna con corrediza",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza con Arco AO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Corrediza con Fijo y Arco A-O-XO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco Fijo con Corrediza",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        },
        {
          nombre: "Guillotina",
          subtipo: [
            {
              nombre: "Guillotina",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "OXO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "XOX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "O-OX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Orio OX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble Orio",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Con Arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Con Arco AO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Con Arco Continuo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "A-OX con Arco Continuo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "OXO con Arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble XOX con Arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Doble Fijo con Arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Fijo con doble Guillotina y Arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                },
                {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        },
        {
          nombre: "Arcos y figuras",
          subtipo: [
            {
              nombre: "Triángulo isosceles",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Forma AO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Hexagonal",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Octagonal",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Triángulo rectángulo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Forma AO-O",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Figura AO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Figura AO-O",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Circular",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco media luna fijo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Media luna con un fijo",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco A-O-O",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco media luna 3 fijos",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco AO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Fijo con arco",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco media luna con 2 fijos",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Arco AOOO luna con 3 fijos",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Catedral",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      nombre: "PD10",
      ceja: [
        {
          nombre: "Ceja"
        },
        {
          nombre: "Ceja enfrente"
        }
      ],
      tipoVidrio: [
        {
          nombre: "Vidrio sencillo",
          tipos: [
            {
              nombre: "Claro"
            },
            {
              nombre: "Low-E"
            },
            {
              nombre: "FiltraSol"
            },
            {
              nombre: "ReflecteSol"
            }
          ] 
        }
      ],
      tipo: [
        {
          nombre: "Puerta Corrediza",
          subtipo: [
            {
              nombre: "Puerta Corrediza",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Puerta Corrediza OXO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Puerta Corrediza OOX",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Puerta Corrediza OXXO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Puerta Corrediza OO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Puerta Corrediza OOOO",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            },
            {
              nombre: "Puerta Corrediza O",
              dimensiones: [
                {
                  wMax: "80",
                  hMax: "20"
                }, {
                  wMin: "11",
                  hMin: "11"
                }
              ]
            }
          ]
        }
      ]
    },
  ]
}; */

