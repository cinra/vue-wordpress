<?php

/**
 * Plugin Name: CINRA Wordpress Package
 * Version: 0.1-alpha
 * Description: Wordpress Package Plugin for CINRA inc,.
 * Author: CINRA Inc,.
 * Author URI: https://www.cinra.co.jp
 * Plugin URI: https://www.cinra.co.jp
 * Text Domain: cinra-wp-package
 * Domain Path: /languages
 * @package CINRA Wordpress Package
 */

/* ----------------------------------------------------------

  ￼Init

---------------------------------------------------------- */

define( 'CWP_PLUGIN_PATH', dirname( __FILE__ ) );
if ( !defined( 'CWP_PROJECT_NAME' ) ) define('CWP_PROJECT_NAME', 'bootstrap');

include_once( CWP_PLUGIN_PATH . '/init.php' );

// ヘルパーの読み込み
foreach (glob(CWP_PLUGIN_PATH . '/helpers/*') as $file)
{
  include_once $file;
}

if (is_admin()) include_once( CWP_PLUGIN_PATH . '/libs/admin/init.php' );