<?php 

use tenup\BlockComponents\Utilities;

if ( file_exists( EXAMPLE_PLUGIN_PATH . 'vendor/autoload.php' ) ) {
	require_once EXAMPLE_PLUGIN_PATH . 'vendor/autoload.php';
}

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<h1>Hello World!</h1>
</div>
