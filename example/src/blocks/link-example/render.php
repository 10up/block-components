<?php
/**
 * Render callback for the block
 *
 * @param array $attributes The block attributes.
 * @param string $content The block content.
 * @param WP_Block $block The block object.
 *
 * @package example
 */

$title = $attributes['title'];

$link_one_url   = isset( $attributes['url'] ) ? $attributes['url'] : '';
$link_one_label = isset( $attributes['text'] ) ? $attributes['text'] : '';

$link_two_url   = isset( $attributes['urlTwo'] ) ? $attributes['urlTwo'] : '';
$link_two_label = isset( $attributes['textTwo'] ) ? $attributes['textTwo'] : '';
?>

<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<h2><?php echo wp_kses_post( $title ); ?></h2>
	<a href="<?php echo esc_url( $link_one_url ); ?>"><?php echo wp_kses_post( $link_one_label ); ?></a>
	<a href="<?php echo esc_url( $link_two_url ); ?>"><?php echo wp_kses_post( $link_two_label ); ?></a>
</div>
