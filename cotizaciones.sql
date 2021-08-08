-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-08-2021 a las 04:27:05
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cotizador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizaciones`
--

CREATE TABLE `cotizaciones` (
  `idCotizacion` int(11) NOT NULL,
  `ventana` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ventana`)),
  `cliente` varchar(100) COLLATE utf16_spanish_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf16_spanish_ci NOT NULL,
  `codigoPostal` varchar(5) COLLATE utf16_spanish_ci NOT NULL,
  `RFC` varchar(20) COLLATE utf16_spanish_ci NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla `cotizaciones`
--

INSERT INTO `cotizaciones` (`idCotizacion`, `ventana`, `cliente`, `direccion`, `codigoPostal`, `RFC`, `fecha`) VALUES
(37, '[{\"serie\":\"Básica\",\"tipoVentana\":\"Fijo Serie 40\",\"subtipoVentana\":\"Fija\",\"dimensionAncho\":\"24\",\"dimensionAlto\":\"24\",\"tipoVidrio\":\"Vidrio sencillo\",\"subtipoVidrio\":\"Claro\",\"total\":1216.98,\"ceja\":\"Sin ceja\",\"colorPrincipal\":\"Blanco\",\"colorSubcolor\":\"Azul\",\"numeroVentanas\":\"1\",\"precio\":\"1216.98\",\"descuento\":0},{\"colorSubcolor\":\"Azul\",\"precioInterior\":3744.99,\"precioExterior\":1872.5,\"precio\":1872.5,\"descuento\":0,\"numeroVentanas\":\"1\",\"total\":1872.5}]', 'Nombre', 'Dirección', 'Códig', 'RFC', '2021-08-07'),
(38, '[{\"serie\":\"Básica\",\"tipoVentana\":\"Fijo Serie 40\",\"subtipoVentana\":\"Fija\",\"dimensionAncho\":\"24\",\"dimensionAlto\":\"24\",\"tipoVidrio\":\"Vidrio sencillo\",\"subtipoVidrio\":\"Claro\",\"total\":1216.98,\"ceja\":\"Sin ceja\",\"colorSubcolor\":\"Rojo Caliente\",\"colorPrincipal\":\"Blanco\",\"numeroVentanas\":\"1\",\"precio\":\"1216.98\",\"descuento\":\"1000\",\"totalDescuento\":216.98000000000002},{\"colorSubcolor\":\"Rojo Caliente\",\"precioInterior\":3744.99,\"precioExterior\":1872.5,\"precio\":1872.5,\"descuento\":\"0\",\"numeroVentanas\":\"1\",\"total\":1872.5,\"totalDescuento\":1872.5}]', 'Nombre', 'Dirección', '12345', 'rfc', '2021-08-07'),
(39, '[{\"serie\":\"Básica\",\"tipoVentana\":\"Fijo Serie 40\",\"subtipoVentana\":\"Fija\",\"dimensionAncho\":\"24\",\"dimensionAlto\":\"24\",\"tipoVidrio\":\"Vidrio sencillo\",\"subtipoVidrio\":\"Claro\",\"total\":12169.8,\"ceja\":\"Sin ceja\",\"colorPrincipal\":\"Blanco\",\"colorSubcolor\":\"Rojo Caliente\",\"numeroVentanas\":\"10\",\"precio\":\"1216.98\",\"descuento\":\"2000\",\"totalDescuento\":10169.8},{\"colorSubcolor\":\"Rojo Caliente\",\"precioInterior\":3744.99,\"precioExterior\":1872.5,\"precio\":1872.5,\"descuento\":\"1000\",\"numeroVentanas\":\"2\",\"total\":3745,\"totalDescuento\":2745}]', 'Nombre', 'Dirección', 'Codig', 'RFC', '2021-08-07');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`idCotizacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  MODIFY `idCotizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
