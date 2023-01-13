<?php
/**
 * Icon Block Template
 */

use function tenup\BlockComponents\Utilities\render_icon;

?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php render_icon( $attributes['icon']['iconSet'], $attributes['icon']['name'] ); ?>
</div>
