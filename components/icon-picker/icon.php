<?php
/**
 * Icon
 *
 * @package tenup\BlockComponents
 */

namespace tenup\BlockComponents\Components;

use function tenup\BlockComponents\Utilities\svg_kses_allowed_html;

/**
 * Icon
 */
class Icon {

	/**
	 * Icon name.
	 *
	 * @var string
	 */
	private $name = '';

	/**
	 * Icon label.
	 *
	 * @var string
	 */
	private $label = '';

	/**
	 * Icon path.
	 *
	 * @var string
	 */
	private $path = '';

	/**
	 * Constructor.
	 *
	 * @param string $name  Name of the icon.
	 * @param string $label Label of the icon.
	 * @param string $path  Path of the icon.
	 */
	public function __construct( $name, $label, $path ) {
		$this->name  = $name;
		$this->label = $label;
		$this->path  = $path;
	}

	/**
	 * Render icon.
	 *
	 * @return void
	 */
	public function render() {
		echo wp_kses( $this->get_markup(), svg_kses_allowed_html() );
	}

	/**
	 * Serialize icon.
	 *
	 * @return array
	 */
	public function serialize_icon() {
		return [
			'name'   => $this->name,
			'label'  => $this->label,
			'source' => $this->get_markup(),
		];
	}

	/**
	 * Get icon markup.
	 *
	 * @return string
	 */
	public function get_markup() {
		return file_get_contents( $this->path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	}

	/**
	 * Get icon name.
	 *
	 * @return string
	 */
	public function get_name() {
		return $this->name;
	}
}
